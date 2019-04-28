import socket
import json

from connection_manager import ConnectionManager
from blockchain_manager import BlockchainManager
from transaction_pool import TransactionPool
from message_manager import (
    MSG_NEW_BLOCK,
    MSG_NEW_TX,
    MSG_ACK_BLOCK,
    MSG_ACK_TX
)

STATUS_IDLE = 1
STATUS_MINING = 2
STATUS_BROADCASTED_BLOCK = 3
STATUS_BROADCASTED_TX = 4
STATUS_RECEIVED_BLOCK = 5
STATUS_RECEIVED_TX = 6


class Node:
    def __init__(self, my_port, node_host=None, node_port=None):
        self.clock = 0
        self.status = STATUS_IDLE
        self.next_status = STATUS_IDLE
        self.new_tx = None
        self.my_ip = self.__get_myip()
        print('Server IP address is set to ... ', self.my_ip)
        self.my_port = my_port
        self.cm = ConnectionManager(self.my_ip, self.my_port, self.__handle_message)
        self.node_host = node_host
        self.node_port = node_port
        self.bm = BlockchainManager()
        self.tp = TransactionPool()

    def start(self):
        self.cm.start()

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

    def __mine(self):
        self.next_status = STATUS_IDLE

    def __broadcast_block(self):
        self.next_status = STATUS_IDLE

    def __broadcast_tx(self):
        self.cm.broadcast_tx(self.new_tx)
        self.new_tx = None
        self.next_status = STATUS_IDLE

    def __receive_block(self):
        self.next_status = STATUS_IDLE

    def __receive_tx(self):
        self.tp.set_tx(self.new_tx)
        self.next_status = STATUS_BROADCASTED_TX

    def __handle_message(self, msg):
        if msg[0] == MSG_NEW_TX:
            tx = json.loads(msg[2])
            if tx in self.tp.get_stored_transaction():
                print("received known tx")
                self.next_status = STATUS_IDLE
            else:
                print("received new tx", tx)
                self.new_tx = tx
                self.next_status = STATUS_RECEIVED_TX

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

    def __generate_block_with_tp(self):
        result = self.tp.get_stored_transaction()
        print('generate_block_with_tp called!')

    def get_status(self):
        data = json.dumps(
            {
                "clock": self.clock,
                "status": self.status
            }
        ).encode("utf-8")
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
        chain = self.bm.chain
        # chain_dict_list = list(map(lambda block: block.to_dict, chain))
        chain_dict_list = []
        for block in chain:
            chain_dict_list.append(block.to_dict())
        return json.dumps(chain_dict_list).encode('utf-8')

    def get_tx_in_pool(self):
        txs = self.tp.get_stored_transaction()
        return json.dumps(txs).encode('utf-8')

    def set_clock(self, clock):
        self.clock = clock
