import socket
import json

from connection_manager import ConnectionManager
from blockchain_manager import BlockchainManager
from transaction_pool import TransactionPool
from message_manager import (
    MSG_NEW_BLOCK,
    MSG_NEW_TX,
    MSG_REQ_CHAIN,
    MSG_CHAIN
)
from block import Block

STATUS_IDLE = 1
STATUS_MINING = 2
STATUS_BROADCASTED_BLOCK = 3
STATUS_BROADCASTED_TX = 4
STATUS_RECEIVED_BLOCK = 5
STATUS_RECEIVED_TX = 6
STATUS_REQUEST_CHAIN = 7
STATUS_SENT_CHAIN = 8
STATUS_RECEIVED_CHAIN = 9


class Node:
    def __init__(self, my_port, node_host=None, node_port=None):
        self.my_ip = self.__get_myip()
        print('Server IP address is set to ... ', self.my_ip)
        self.my_port = my_port
        self.cm = ConnectionManager(self.my_ip, self.my_port, self.__handle_message)
        self.node_host = node_host
        self.node_port = node_port
        self.bm = BlockchainManager()
        self.tp = TransactionPool()

        self.clock = 0
        self.status = STATUS_IDLE
        self.next_status = STATUS_IDLE
        self.new_txs = []
        self.end_mining_clock = None
        self.new_block = None
        self.to_port = None

    def start(self):
        self.cm.start()

    def reset(self):
        self.bm.clear_chain()
        self.tp.clear()
        self.clock = 0
        self.status = STATUS_IDLE
        self.next_status = STATUS_IDLE

    def work(self, clock):
        self.clock = clock
        self.status = self.next_status
        if self.status == STATUS_MINING:
            self.__mine()
        elif self.status == STATUS_BROADCASTED_BLOCK:
            self.__broadcast_block()
        elif self.status == STATUS_BROADCASTED_TX:
            self.__broadcast_tx()
        elif self.status == STATUS_RECEIVED_BLOCK:
            self.__receive_block()
        elif self.status == STATUS_RECEIVED_TX:
            self.__receive_tx()
        elif self.status == STATUS_REQUEST_CHAIN:
            self.__receive_tx()
        elif self.status == STATUS_SENT_CHAIN:
            self.__receive_tx()
        elif self.status == STATUS_RECEIVED_CHAIN:
            self.__receive_tx()

    def __mine(self):
        if self.end_mining_clock is None:
            self.end_mining_clock = self.clock + 2
            self.new_block = self.__generate_block_with_tp()
            print("new block: ", self.new_block)
            self.next_status = STATUS_MINING
        elif self.end_mining_clock > self.clock:
            self.next_status = STATUS_MINING
        else:
            self.bm.set_new_block(self.new_block)
            self.tp.clear()
            self.end_mining_clock = None
            self.next_status = STATUS_BROADCASTED_BLOCK

    def __broadcast_block(self):
        self.cm.broadcast_block(self.new_block)
        self.new_block = None
        self.next_status = STATUS_IDLE

    def __broadcast_tx(self):
        self.cm.broadcast_tx(self.new_txs)
        self.new_txs = []
        self.next_status = STATUS_IDLE

    def __receive_block(self):
        self.bm.set_new_block(self.new_block)
        self.next_status = STATUS_BROADCASTED_BLOCK

    def __receive_tx(self):
        self.tp.set_tx(self.new_txs)
        self.next_status = STATUS_BROADCASTED_TX

    def __request_chain(self):
        self.cm.request_chain(self.to_port)
        self.to_port = None
        self.next_status = STATUS_IDLE

    def __send_chain(self):
        chain_json = self.bm.get_chain_json()
        self.cm.send_chain(chain_json, self.to_port)

    def __received_chain(self):
        self.next_status = STATUS_IDLE

    def __generate_block_with_tp(self):
        txs = self.tp.get_stored_transaction()
        if txs:
            return self.bm.generate_new_block(txs)

    def add_peer(self, peer):
        self.cm.add_peer((peer['addr'], peer['port']))

    def clear_peer(self, peer):
        self.cm.clear_peer((peer['addr'], peer['port']))

    def __handle_message(self, msg):
        if msg[0] == MSG_NEW_BLOCK:
            block_dict = msg[2]
            if block_dict['id'] + 1 <= len(self.bm.chain):
                print("received known block")
                self.next_status = STATUS_IDLE
            else:
                block = Block(block_dict['id'], block_dict['transaction'],
                              block_dict['previous_block_hash'], block_dict['nonce'],
                              block_dict['timestamp'])
                print("received new block", block.to_dict())
                if block.previous_block_hash == self.bm.chain[-1].get_hash():
                    self.new_block = block
                    self.next_status = STATUS_RECEIVED_BLOCK
                else:
                    self.to_port = msg[1]
                    self.next_status = STATUS_REQUEST_CHAIN
        elif msg[0] == MSG_NEW_TX:
            txs = json.loads(msg[2])
            for tx in txs:
                if tx in self.tp.get_stored_transaction():
                    print("received known tx")
                else:
                    print("received new tx", tx)
                    self.new_txs.append(tx)
                    self.next_status = STATUS_RECEIVED_TX
        elif msg[0] == MSG_REQ_CHAIN:
            self.to_port = msg[1]
            self.next_status = STATUS_SENT_CHAIN
        elif msg[0] == MSG_CHAIN:
            self.bm.clear_chain()
            chain = msg[2]
            for block_dict in chain:
                block = Block(block_dict['id'], block_dict['transaction'],
                              block_dict['previous_block_hash'], block_dict['nonce'],
                              block_dict['timestamp'])
                self.bm.set_new_block(block)
            self.next_status = STATUS_RECEIVED_CHAIN

    def join_network(self):
        if self.node_host is not None:
            self.cm.join_network(self.node_host, self.node_port)
        else:
            print('This server is running as Genesis Node ...')

    def get_current_status(self):
        return self.status

    def __get_myip(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]

    def get_status(self):
        data = json.dumps(
            {
                "clock": self.clock,
                "status": self.status
            }
        ).encode("utf-8")
        return data

    def get_peers(self):
        data = json.dumps(self.cm.peers).encode('utf-8')
        return data

    def get_latest_block(self):
        latest_block = self.bm.chain[-1]
        return latest_block.to_json()

    def get_block(self, index):
        chain = self.bm.chain
        if index < len(chain):
            return chain[index].to_json()
        else:
            return None

    def get_all_blocks(self):
        return self.bm.get_chain_json()

    def get_tx_in_pool(self):
        txs = self.tp.get_stored_transaction()
        return json.dumps(txs).encode('utf-8')

    def set_clock(self, clock):
        self.clock = clock
