import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:8b")
    
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
    
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")

settings = Settings()
