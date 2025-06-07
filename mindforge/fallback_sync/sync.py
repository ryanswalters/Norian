import logging
from typing import Iterable
from datetime import datetime

from mindforge.vector_store import store_text

logger = logging.getLogger(__name__)

# In-memory store of unsynced entries for demo purposes
UNSYNCED: list[tuple[str, str, dict]] = []


def add_unsynced(id: str, text: str, payload: dict):
    payload = payload.copy()
    payload.update({
        "source": payload.get("source", "unknown"),
        "timestamp": datetime.utcnow().isoformat()
    })
    UNSYNCED.append((id, text, payload))


def sync_qdrant_memory():
    logger.info("Syncing %d unsynced entries", len(UNSYNCED))
    remaining: list[tuple[str, str, dict]] = []
    for id_, text, payload in UNSYNCED:
        try:
            store_text(id_, text, payload)
        except Exception as e:
            logger.error("Failed to sync %s: %s", id_, e)
            remaining.append((id_, text, payload))
    UNSYNCED.clear()
    UNSYNCED.extend(remaining)
return len(UNSYNCED) == 0
