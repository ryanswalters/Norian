import logging
from typing import List

try:
    from sentence_transformers import SentenceTransformer
except ImportError:  # pragma: no cover
    SentenceTransformer = None  # type: ignore

logger = logging.getLogger(__name__)

class EmbeddingManager:
    def __init__(self, engine: str = "local", local_model_path: str = "./models/all-MiniLM-L6-v2"):
        self.engine = engine
        self.local_model_path = local_model_path
        self._model = None

    def _load_local_model(self):
        if SentenceTransformer is None:
            raise RuntimeError("sentence-transformers is not installed")
        if self._model is None:
            self._model = SentenceTransformer(self.local_model_path)
            logger.info("Loaded local embedding model from %s", self.local_model_path)

    def get_embedding(self, text: str) -> List[float]:
        if self.engine == "openai":
            try:
                import openai
                resp = openai.Embedding.create(model="text-embedding-ada-002", input=text)
                return resp["data"][0]["embedding"]
            except Exception as e:
                logger.error("OpenAI embedding failed: %s", e)
                if self.engine != "local":
                    self.engine = "local"
        if self.engine == "local":
            self._load_local_model()
            return self._model.encode(text).tolist()
        raise RuntimeError("No embedding engine available")
