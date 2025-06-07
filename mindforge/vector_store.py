import os
import logging
logging.basicConfig(filename="logs/qdrant.log", level=logging.INFO)
import yaml
from pathlib import Path
from typing import List, Any

from mindforge.qdrant_adapter.qdrant_adapter import QdrantAdapter
from mindforge.fallback_sync.embedding_manager import EmbeddingManager

logger = logging.getLogger(__name__)

CONFIG_PATH = Path(__file__).resolve().parent / "config.yaml"

with open(CONFIG_PATH) as f:
    CONFIG = yaml.safe_load(f)

adapter: QdrantAdapter | None = None
embedding_manager: EmbeddingManager | None = None


def _init():
    os.makedirs("logs", exist_ok=True)
    global adapter, embedding_manager
    vec_conf = CONFIG.get("qdrant", {})
    embed_conf = CONFIG.get("embedding", {})
    adapter = QdrantAdapter(host=vec_conf.get("host", "localhost"),
                            port=vec_conf.get("port", 6333),
                            collection=vec_conf.get("collection", "axyn_memory"))
    embedding_manager = EmbeddingManager(engine=embed_conf.get("engine", "local"),
                                         local_model_path=embed_conf.get("local_model_path", "./models/all-MiniLM-L6-v2"))


_init()


def store_text(id: str, text: str, payload: dict | None = None):
    assert adapter and embedding_manager
    embedding = embedding_manager.get_embedding(text)
    payload = payload or {}
    adapter.upsert_vector(id, embedding, payload)


def search_text(text: str, top_k: int = 5) -> List[Any]:
    assert adapter and embedding_manager
    embedding = embedding_manager.get_embedding(text)
    return adapter.search(embedding, top_k=top_k)


def delete(id: str):
    assert adapter
    adapter.delete_vector(id)
