import threading
import json

from block import Block

GENESIS_BLOCK = Block(0, [{"sender": None, "recipient": "aki", "value": 10}], None, 0)


class BlockchainManager:
    def __init__(self):
        self.chain = [GENESIS_BLOCK]
        self.lock = threading.Lock()

    def set_new_block(self, block):
        with self.lock:
            self.chain.append(block)

    def generate_new_block(self, transaction):
        latest_block = self.chain[-1]
        i = 0
        while True:
            new_block = Block(latest_block.id + 1, transaction, latest_block.get_hash(), i)
            if new_block.get_hash()[-3:] == "000":
                return new_block
            i += 1


