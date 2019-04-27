import threading
import hashlib
import json

from block import Block

GENESIS_BLOCK = Block({"sender": None, "recipient": "node1", "value": 10}, None)

class BlockchainManager:
    def __init__(self):
        print('Initializing BlockchainManager ...')
        self.chain = [GENESIS_BLOCK]
        self.lock = threading.Lock()

    def set_new_block(self, block):
        with self.lock:
            self.chain.append(block)

    @staticmethod
    def sha256sha256(data):
        return hashlib.sha256(hashlib.sha256(data).hexdigest()).hexdigest()

    def get_hash(self):
        return self.sha256sha256(json.dumps(self.__dict__))
