from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import json

from app.tasks.generation_tasks import start_seo_pipeline_task

app = FastAPI(title="Autonomous SEO Agent API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow the Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineRequest(BaseModel):
    niche: string
    num_articles: int = 50

@app.post("/api/pipeline/start")
async def start_pipeline(req: PipelineRequest):
    job_id = str(uuid.uuid4())
    
    # Start the Celery task
    task = start_seo_pipeline_task.delay(job_id, req.niche, req.num_articles)
    
    return {
        "status": "accepted",
        "job_id": job_id,
        "task_id": task.id,
        "message": f"Started SEO generation pipeline for niche: {req.niche}"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "seo-agents"}
