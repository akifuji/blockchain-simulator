import socket
import json

from connection_manager import ConnectionManager
from blockchain_manager import BlockchainManager
from transaction_pool import TransactionPool

STATUS_IDLE = 1
STATUS_MINING = 2
STATUS_BROADCASTING_BLOCK = 3
STATUS_BROADCASTING_TX = 4
STATUS_RECEIVING_BLOCK = 5
STATUS_RECEIVING_TX = 6


class Node:
    def __init__(self, my_port=50082, node_host=None, node_port=None):
        self.clock = 0
        self.status = STATUS_IDLE
        print('Initializing server ...')
        self.my_ip = self.__get_myip()
        print('Server IP address is set to ... ', self.my_ip)
        self.my_port = my_port
        self.cm = ConnectionManager(self.my_ip, self.my_port)
        self.node_host = node_host
        self.node_port = node_port
        self.bm = BlockchainManager()
        self.tp = TransactionPool()

    def start(self):
        self.status = STATUS_IDLE
        self.cm.start()

    def join_network(self):
        if self.node_host is not None:
            self.status = STATUS_IDLE
            self.cm.join_network(self.node_host, self.node_port)
        else:
            print('This server is running as Genesis Node ...')

    def shutdown(self):
        self.status = STATUS_IDLE
        print('Shutdown server')

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