from crewai import Agent
from langchain.llms import Ollama

def get_seo_optimizer(llm: Ollama) -> Agent:
    return Agent(
        role='Technical SEO Optimizer',
        goal='Generate perfect meta data, JSON-LD schemas, and optimize keyword density.',
        backstory='''You are a Technical SEO specialist. You analyze written content to generate 
        high-CTR meta titles and descriptions. You are an expert at writing precise JSON-LD structured data 
        (Article, FAQ, Breadcrumb) that validates perfectly. You also ensure optimal readability 
        and semantic keyword variations.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
