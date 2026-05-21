from supabase import create_client, Client
from app.config import settings

def get_supabase_client() -> Client:
    """Returns a Supabase client configured with credentials from settings."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError("Supabase credentials are not fully set in the environment.")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
