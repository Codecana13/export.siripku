from crewai import Agent
from langchain.llms import Ollama

def get_longform_writer(llm: Ollama) -> Agent:
    return Agent(
        role='Elite Long-form Content Writer',
        goal='Write deeply informative, EEAT-optimized content section-by-section without hallucination.',
        backstory='''You are a master copywriter and technical writer. 
        Your content is human-like, authoritative, and perfectly optimized for semantic SEO.
        You strictly follow outlines and write one detailed section at a time to maintain depth and context.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
