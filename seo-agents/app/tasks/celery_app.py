from celery import Celery
import os

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "seo_agents",
    broker=redis_url,
    backend=redis_url,
    include=["app.tasks.generation_tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    worker_concurrency=2, # Limit concurrency to avoid overloading Ollama
)
