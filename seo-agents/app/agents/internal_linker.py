from crewai import Agent
from langchain.llms import Ollama

def get_internal_linker(llm: Ollama) -> Agent:
    return Agent(
        role='Internal Linking Strategist',
        goal='Analyze content and insert semantically relevant internal links with optimized anchor text.',
        backstory='''You are an expert at building site architecture and PageRank flow. 
        You use vector semantic search to find the most relevant existing articles in the database 
        and naturally integrate contextual internal links into new content. You understand the difference 
        between pillar and cluster relationships.''',
        verbose=True,
        allow_delegation=False,
        llm=llm
    )
