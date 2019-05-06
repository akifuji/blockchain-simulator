from time import time
import json
import hashlib
import binascii


class Block:
    def __init__(self, block_id, transaction, previous_block_hash, nonce, timestamp=None):
        self.id = block_id
        self.transaction = transaction
        self.previous_block_hash = previous_block_hash
        self.nonce = nonce
        if timestamp:
            self.timestamp = timestamp
        else:
            self.timestamp = time()

    def __to_dict_without_hash(self):
        return {
            "id": self.id,
            "transaction": self.transaction,
            "previous_block_hash": self.previous_block_hash,
            "nonce": self.nonce,
            "timestamp": self.timestamp
        }

    def to_dict(self):
        block_dict = self.__to_dict_without_hash()
        block_dict["hash"] = self.get_hash()
        return block_dict

    def to_json(self):
        return json.dumps(self.to_dict()).encode('utf-8')

    @staticmethod
    def __sha256sha256(data):
        return hashlib.sha256(hashlib.sha256(data).digest()).digest()

    def get_hash(self):
        digest = self.__sha256sha256(json.dumps(self.__to_dict_without_hash()).encode('utf-8'))
        return binascii.hexlify(digest).decode('ascii')
