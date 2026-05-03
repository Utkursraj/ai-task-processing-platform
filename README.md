# AI Task Processing Platform

A full-stack system that processes tasks asynchronously using a queue-based architecture.

## Overview

- User authentication (JWT)
- Create and process tasks
- Queue-based async processing (BullMQ + Redis)
- View task status, results, and logs
- Dashboard UI

## Architecture

Frontend (React) → Backend API (Node.js) → MongoDB → Redis Queue → Worker → MongoDB

## Tech Stack

Frontend: React (Vite)  
Backend: Node.js, Express  
Database: MongoDB  
Queue: Redis + BullMQ  
DevOps: Docker, Kubernetes, GitHub Actions, ArgoCD, Render  

## Live URLs

Frontend:  
https://ai-task-processing-platform-1wvq.onrender.com  

Backend:  
https://ai-task-processing-platform-backend.onrender.com/api  

## API

Auth:
- POST /api/auth/register  
- POST /api/auth/login  

Tasks:
- POST /api/tasks  
- GET /api/tasks  
- GET /api/tasks/:id  
- GET /api/tasks/:id/logs  

## Environment Variables

Backend:
NODE_ENV=production  
PORT=10000  
MONGO_URI=your_mongo_uri  
JWT_SECRET=your_secret  
REDIS_HOST=your_redis_host  
REDIS_PORT=6379  
REDIS_PASSWORD=your_redis_password  
CORS_ORIGIN=your_frontend_url  

Frontend:
VITE_API_URL=https://your-backend-url/api  

## Conclusion

A scalable system using async processing, containerization, and modern DevOps practic
