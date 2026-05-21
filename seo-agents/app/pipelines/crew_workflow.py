from crewai import Agent, Task, Crew, Process
from langchain.llms import Ollama
from app.config import settings
import json

# Initialize local LLM
local_llm = Ollama(base_url=settings.OLLAMA_URL, model=settings.OLLAMA_MODEL, temperature=0.7)

def create_seo_crew(niche: str, num_articles: int = 50):
    
    # AGENTS
    strategist = Agent(
        role='Senior SEO Strategist',
        goal=f'Create a comprehensive topical authority map and generate {num_articles} article ideas for {niche}',
        backstory='You are a master of semantic SEO and topical authority. You find content gaps and group them into logical pillars and clusters.',
        verbose=True,
        allow_delegation=False,
        llm=local_llm
    )
    
    # We will expand these in full detail later. For now, we define the structure.
    
    # TASKS
    strategy_task = Task(
        description=f'Analyze the {niche} niche. Create a topical map with 5 clusters. Generate {num_articles} article ideas based on these clusters. Return structured JSON.',
        expected_output=f'A JSON object containing the topical map and a list of {num_articles} article titles with target keywords.',
        agent=strategist
    )

    # CREW
    crew = Crew(
        agents=[strategist],
        tasks=[strategy_task],
        process=Process.sequential
    )
    
    return crew
