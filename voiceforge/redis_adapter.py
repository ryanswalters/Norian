import redis
import logging

logger = logging.getLogger(__name__)

class RedisAdapter:
    def __init__(self, host: str = 'localhost', port: int = 6379, db: int = 0):
        try:
            self.client = redis.Redis(host=host, port=port, db=db)
            self.client.ping()
            logger.info("Connected to Redis at %s:%s", host, port)
        except Exception as e:
            logger.error("Failed to connect to Redis: %s", e)
            self.client = None

    def cache(self, key: str, value: str, ttl: int = 3600):
        if self.client:
            try:
                self.client.setex(key, ttl, value)
            except Exception as e:
                logger.error("Redis cache error: %s", e)

    def get_cached(self, key: str) -> str | None:
        if self.client:
            try:
                data = self.client.get(key)
                return data.decode() if data else None
            except Exception as e:
                logger.error("Redis fetch error: %s", e)
        return None
