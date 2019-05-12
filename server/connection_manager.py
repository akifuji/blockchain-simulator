import socket
import threading
import json

from message_manager import (
    MessageManager,
    MSG_ADD,
    MSG_NEW_BLOCK,
    MSG_NEW_TX,
    MSG_CHAIN
)


class ConnectionManager:
    def __init__(self, host, port, callback):
        self.host = host
        self.port = port
        self.mm = MessageManager()
        self.callback = callback
        self.peers = set()

        # connect to 2 peers
        self.peers = [(host, 65001), (host, 65002)]
        # connect to 3 peers
        # self.peers = [(host, 65001), (host, 65002), (host, 65003)]

    def start(self):
        t = threading.Thread(target=self.__wait_for_access)
        t.start()

    def add_peer(self, peer):
        self.peers.append(peer)

    def clear_peer(self, peer):
        self.peers.remove(peer)
        
    def __wait_for_access(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind((self.host, self.port))
        self.socket.listen(0)

        while True:
            print('Waiting for the connection ...')
            soc, addr = self.socket.accept()
            data_sum = ''
            params = (soc, addr, data_sum)
            self.__handle_message(params)

    def __handle_message(self, params):
        soc, addr, data_sum = params

        while True:
            data = soc.recv(1024)
            data_sum = data_sum + data.decode('utf-8')
            if not data:
                break

        if not data_sum:
            return

        cmd, peer_port, payload = self.mm.parse(data_sum)
        print(cmd, peer_port, payload)

        if cmd == MSG_ADD:
            print('ADD node request was received!')
            self.add_peer((addr[0], peer_port))
        else:
            self.callback((cmd, peer_port, payload))

    def broadcast_tx(self, tx):
        msg = self.mm.build(MSG_NEW_TX, self.port, json.dumps(tx))
        self.send_msg_to_all_peer(msg)

    def broadcast_block(self, block):
        msg = self.mm.build(MSG_NEW_BLOCK, self.port, block.to_dict())
        self.send_msg_to_all_peer(msg)

    def request_chain(self, port):
        msg = self.mm.build(MSG_NEW_BLOCK, self.port)
        self.send_msg((self.host, port), msg)

    def send_chain(self, chain, port):
        msg = self.mm.build(MSG_CHAIN, self.port, chain)
        self.send_msg((self.host, port), msg)

    @staticmethod
    def send_msg(peer, msg):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((peer))
            s.sendall(msg.encode('utf-8'))
            s.close()
        except OSError:
            print('Connection failed for peer : ', peer)

    def send_msg_to_all_peer(self, msg):
        print('send_msg_to_all_peer was called!')
        for peer in self.peers:
            if peer != (self.host, self.port):
                print('message will be sent to ...', peer)
                self.send_msg(peer, msg)

    def join_network(self, host, port):
        self.my_host = host
        self.my_port = port
        self.__connect_to_P2PNW(host, port)

    def __connect_to_P2PNW(self, host, port):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
        self.__add_peer((host, port))
        msg = self.mm.build(MSG_ADD, self.port)
        s.sendall(msg.encode('utf-8'))
        s.close()

