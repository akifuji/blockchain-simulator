from time import time


class Block:
    def __init__(self, transaction, previous_block_hash):
        self.timestamp = time()
        self.transaction = transaction
        self.previous_block_hash = previous_block_hash

    def to_dict(self):
        return {
            "timestamp": self.timestamp,
            "transaction": self.transaction,
            "previous_block_hash": self.previous_block_hash,
        }

    def describe(self):
        print("hash: {}, timestamp: {}, data: {}, previous_block_hash: {}, nonce: {}"
              .format(self.get_hash(), self.timestamp, self.data, self.previous_block_hash, self.nonce))