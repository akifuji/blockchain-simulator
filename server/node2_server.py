from flask import Flask
from flask import request
from flask_cors import CORS

from node import (
    Node,
    STATUS_MINING,
    STATUS_RECEIVED_TX
)

app = Flask(__name__)
CORS(app)
node = None


@app.route('/start')
def start():
    global node
    node = Node(65002)
    node.start()
    return '', 200


@app.route('/reset')
def reset():
    global node
    node.reset()
    return '', 200


@app.route('/status', methods=['GET'])
def get_status():
    global node
    return node.get_status()


@app.route('/peer', methods=['GET'])
def get_peers():
    global node
    return node.get_peers()


@app.route('/block/latest', methods=['GET'])
def get_latest_block():
    global node
    return node.get_latest_block()


@app.route('/block/<id>', methods=['GET'])
def get_block(id):
    global node
    block = node.get_block(int(id))
    if block:
        return block, 200
    else:
        return '', 404


@app.route('/block/all', methods=['GET'])
def get_all_block():
    global node
    return node.get_all_blocks()


@app.route('/txPool/all', methods=['GET'])
def get_tx_in_pool():
    global node
    return node.get_tx_in_pool()


@app.route('/mine', methods=['GET'])
def mine():
    global node
    node.next_status = STATUS_MINING
    return '', 200


@app.route('/clock/<clock>', methods=['GET'])
def set_clock(clock):
    global node
    node.work(int(clock))
    return '', 200


@app.route('/tx/add', methods=['POST'])
def add_tx():
    global node
    tx = request.get_json()
    node.new_txs.append(tx)
    node.next_status = STATUS_RECEIVED_TX
    return 'success', 200


@app.route('/peer/add', methods=['POST'])
def add_peer():
    global node
    peer = request.get_json()
    node.add_peer(peer)
    return 'success', 200


@app.route('/peer/clear', methods=['POST'])
def clear_peer():
    global node
    peer = request.get_json()
    node.clear_peer(peer)
    return 'success', 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=50083)
