from crewai import Agent
from langchain.llms import Ollama

def get_outline_generator(llm: Ollama) -> Agent:
    return Agent(
        role='SEO Outline Architect',
        goal='Create highly structured, semantically optimized article outlines.',
        backstory='''You are an expert in content structure and semantic SEO. 
        You know exactly how to organize headers (H1, H2, H3), where to place FAQs, 
        and how to structure content to capture Featured Snippets and People Also Ask boxes.
        You ensure logical flow and comprehensive topic coverage.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
