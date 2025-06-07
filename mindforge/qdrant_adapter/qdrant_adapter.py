import logging
from typing import List, Any

try:
    from qdrant_client import QdrantClient
    from qdrant_client.http import models as rest
except ImportError:  # pragma: no cover - qdrant not installed
    QdrantClient = None  # type: ignore
    rest = None  # type: ignore

logger = logging.getLogger(__name__)

class QdrantAdapter:
    def __init__(self, host: str = "localhost", port: int = 6333, collection: str = "axyn_memory"):
        if QdrantClient is None:
            raise RuntimeError("qdrant-client is not installed")
        self.client = QdrantClient(host=host, port=port)
        self.collection = collection
        try:
            self.client.get_collection(collection_name=collection)
        except Exception:
            self.client.recreate_collection(collection_name=collection,
                                            vectors_config=rest.VectorParams(size=768, distance=rest.Distance.COSINE))
        logger.info("Connected to Qdrant at %s:%s", host, port)

    def upsert_vector(self, id: str, embedding: List[float], payload: dict):
        logger.debug("Upserting vector %s", id)
        self.client.upsert(collection_name=self.collection,
                           points=[rest.PointStruct(id=id, vector=embedding, payload=payload)])

    def search(self, query_vector: List[float], top_k: int = 5) -> List[Any]:
        logger.debug("Searching top %s", top_k)
        hits = self.client.search(collection_name=self.collection,
                                  query_vector=query_vector, limit=top_k)
        return hits

    def delete_vector(self, id: str):
        logger.debug("Deleting vector %s", id)
        self.client.delete(collection_name=self.collection, points_selector=rest.PointIdsList(points=[id]))
