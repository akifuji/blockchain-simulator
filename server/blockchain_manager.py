import threading
import json

from block import Block

GENESIS_BLOCK = Block(0, [{"sender": None, "recipient": "aki", "value": 2},
                          {"sender": None, "recipient": "so", "value": 7},
                          {"sender": None, "recipient": "satoshi", "value": 5}], None, 0, 9999999)


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

    def get_chain_json(self):
        chain_dict_list = []
        for block in self.chain:
            chain_dict_list.append(block.to_dict())
        return json.dumps(chain_dict_list).encode('utf-8')

    def clear_chain(self):
        self.chain = [GENESIS_BLOCK]
