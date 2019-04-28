from flask import Flask

from node import Node

app = Flask(__name__)
node = Node(50082)


@app.route('/')
def index():
    return 'Hello'


@app.route('/status', methods=['GET'])
def get_status():
    return node.get_status()


@app.route('/block/latest', methods=['GET'])
def get_latest_block():
    return node.get_latest_block()


@app.route('/block/<id>', methods=['GET'])
def get_block(id):
    block = node.get_block(int(id))
    if block:
        return block, 200
    else:
        return '', 404


@app.route('/block/all', methods=['GET'])
def get_all_block():
    return node.get_all_blocks()


@app.route('/txPool/all', methods=['GET'])
def get_tx_in_pool():
    return node.get_tx_in_pool()


@app.route('/mine', methods=['GET'])
def mine():
    return '', 200


@app.route('/clock/<clock>', methods=['GET'])
def set_clock(clock):
    return '', 200


@app.route('/tx/add', methods=['POST'])
def add_tx(tx):
    return '', 200


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=50082)