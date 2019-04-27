import socket

from connection_manager import ConnectionManager
from blockchain_manager import BlockchainManager
from transaction_pool import TransactionPool

STATE_INIT = 0
STATE_STANDBY = 1
STATE_CONNECTED_TO_NETWORK = 2
STATE_SHUTTING_DOWN = 3


class Node:
    def __init__(self, my_port=50082, node_host=None, node_port=None):
        self.server_state = STATE_INIT
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
        self.server_state = STATE_STANDBY
        self.cm.start()

    def join_network(self):
        if self.node_host is not None:
            self.server_state = STATE_CONNECTED_TO_NETWORK
            self.cm.join_network(self.node_host, self.node_port)
        else:
            print('This server is running as Genesis Node ...')

    def shutdown(self):
        self.server_state = STATE_SHUTTING_DOWN
        print('Shutdown server')

    def get_current_state(self):
        return self.server_state

    def __get_myip(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]

    def __generate_block_with_tp(self):
        result = self.tp.get_stored_transaction()
        print('generate_block_with_tp called!')

