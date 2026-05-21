from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer
from app.config import settings

class VectorStore:
    def __init__(self):
        self.client = QdrantClient(url=settings.QDRANT_URL)
        self.collection_name = "siripku_articles"
        # We use a lightweight embedding model for fast local CPU execution
        self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
        self._ensure_collection()
        
    def _ensure_collection(self):
        collections = self.client.get_collections().collections
        if not any(c.name == self.collection_name for c in collections):
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=384, distance=Distance.COSINE),
            )
            
    def add_article(self, article_id: str, text: str, metadata: dict):
        """Generates embedding for an article and stores it in Qdrant."""
        vector = self.encoder.encode(text).tolist()
        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                {
                    "id": article_id,  # UUID must be converted or hashed if needed
                    "vector": vector,
                    "payload": metadata
                }
            ]
        )
        
    def search_similar_articles(self, query_text: str, limit: int = 3):
        """Finds semantically similar articles for internal linking."""
        query_vector = self.encoder.encode(query_text).tolist()
        hits = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit
        )
        return [{"id": hit.id, "score": hit.score, "payload": hit.payload} for hit in hits]

# Singleton instance
vector_store = VectorStore()
