from crewai import Agent
from langchain.llms import Ollama

def get_publisher(llm: Ollama) -> Agent:
    return Agent(
        role='Content Publisher & Media Manager',
        goal='Format final content, manage images via Cloudinary, and publish to Supabase.',
        backstory='''You are the final gatekeeper before an article goes live. 
        You ensure all markdown formatting is perfect. You manage the upload of featured images 
        (or placeholder references) and you generate the final database records for Supabase, 
        including scheduling the publication date to maintain a consistent content calendar.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
