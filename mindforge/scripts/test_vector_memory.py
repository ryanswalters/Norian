from mindforge.vector_store import store_text, search_text
from mindforge.fallback_sync.sync import sync_qdrant_memory, add_unsynced

if __name__ == "__main__":
    # Simple test storing and searching a dummy text
    text = "Hello world"
    try:
        store_text("1", text, {"source": "test"})
    except Exception as e:
        add_unsynced("1", text, {"source": "test"})
        print("Store failed, added to unsynced:", e)

    try:
        results = search_text("Hello", top_k=1)
        print("Search results:", results)
    except Exception as e:
        print("Search failed:", e)

    if sync_qdrant_memory():
        print("Synced unsaved entries")
