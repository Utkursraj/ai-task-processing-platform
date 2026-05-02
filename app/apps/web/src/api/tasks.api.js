import { apiRequest } from "./http";

export function createTask(payload) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getTasks() {
  return apiRequest("/tasks");
}

export function getTask(id) {
  return apiRequest(`/tasks/${id}`);
}

export function getTaskLogs(id) {
  return apiRequest(`/tasks/${id}/logs`);
}