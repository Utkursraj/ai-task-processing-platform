import os
import time
import json
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId
import redis


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
QUEUE_NAME = os.getenv("QUEUE_NAME", "task-processing")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is required")


mongo = MongoClient(MONGO_URI)
try:
    db = mongo.get_default_database()
except Exception:
    db = mongo["ai_task_platform"]

tasks = db["tasks"]
task_logs = db["tasklogs"]

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    decode_responses=True,
)


def now():
    return datetime.now(timezone.utc)


def add_log(task_id, level, message, meta=None):
    task_logs.insert_one({
        "taskId": ObjectId(task_id),
        "level": level,
        "message": message,
        "meta": meta or {},
        "createdAt": now(),
        "updatedAt": now(),
    })


def process_text(input_text, operation):
    if operation == "uppercase":
        return input_text.upper()

    if operation == "lowercase":
        return input_text.lower()

    if operation == "reverse":
        return input_text[::-1]

    if operation == "word_count":
        return str(len(input_text.split()))

    raise ValueError(f"Unsupported operation: {operation}")


def extract_job_data(raw_job):
    """
    BullMQ stores job data as JSON inside Redis.
    This simple worker reads waiting jobs manually from BullMQ Redis lists.
    """
    job = json.loads(raw_job)
    return job.get("data", {})


def run_worker():
    print("Python worker started")

    wait_key = f"bull:{QUEUE_NAME}:wait"

    while True:
        try:
            job_id = redis_client.rpop(wait_key)

            if not job_id:
                time.sleep(2)
                continue

            job_key = f"bull:{QUEUE_NAME}:{job_id}"
            raw_data = redis_client.hget(job_key, "data")

            if not raw_data:
                print(f"Job {job_id} has no data")
                continue

            data = json.loads(raw_data)
            task_id = data["taskId"]

            task = tasks.find_one({"_id": ObjectId(task_id)})

            if not task:
                print(f"Task not found: {task_id}")
                continue

            if task.get("status") == "success":
                add_log(task_id, "info", "Task already processed, skipping")
                continue

            tasks.update_one(
                {"_id": ObjectId(task_id), "status": {"$ne": "success"}},
                {
                    "$set": {
                        "status": "running",
                        "updatedAt": now(),
                    },
                    "$inc": {"attempts": 1},
                },
            )

            add_log(task_id, "info", "Task processing started", {
                "operation": task["operation"]
            })

            try:
                result = process_text(task["inputText"], task["operation"])

                tasks.update_one(
                    {"_id": ObjectId(task_id)},
                    {
                        "$set": {
                            "status": "success",
                            "result": result,
                            "error": None,
                            "updatedAt": now(),
                        }
                    },
                )

                add_log(task_id, "info", "Task processing completed", {
                    "result": result
                })

                print(f"Processed task {task_id}")

            except Exception as error:
                tasks.update_one(
                    {"_id": ObjectId(task_id)},
                    {
                        "$set": {
                            "status": "failed",
                            "error": str(error),
                            "updatedAt": now(),
                        }
                    },
                )

                add_log(task_id, "error", "Task processing failed", {
                    "error": str(error)
                })

                print(f"Failed task {task_id}: {error}")

        except Exception as error:
            print(f"Worker loop error: {error}")
            time.sleep(3)


if __name__ == "__main__":
    run_worker()