from crewai import Agent
from langchain.llms import Ollama
from app.config import settings

def get_seo_strategist(llm: Ollama) -> Agent:
    return Agent(
        role='Senior SEO Strategist',
        goal='Create a comprehensive topical authority map and generate highly clickable article ideas.',
        backstory='''You are an elite SEO Strategist and Topical Map Architect. 
        You specialize in uncovering semantic clusters, identifying pillar and supporting topics, 
        and generating scalable article ideas that rank on page 1 of Google. 
        You prioritize user intent and topical comprehensiveness.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
