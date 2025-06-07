import logging
import requests
from typing import Optional

class LoggingBridge:
    def __init__(self, remote_url: Optional[str] = None, log_file: str = 'logs/bridge.log'):
        self.remote_url = remote_url
        self.logger = logging.getLogger('LoggingBridge')
        handler = logging.FileHandler(log_file)
        handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(message)s'))
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)

    def log(self, message: str):
        self.logger.info(message)
        if self.remote_url:
            try:
                requests.post(self.remote_url, json={'message': message})
            except Exception as e:
                self.logger.error('Remote log failed: %s', e)
