import argparse
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# status list)
# 1: idle
# 2: mining
# 3: broadcasting-block
# 4: broadcasting-tx
# 5: receiving-block
# 6: receiving-tx
state = {
    'clock': 0,
    'status': 'idle'
}
script = []


def run(args):
    print(args)
    load_script(args.script)
    app.debug = True
    app.run(host='0.0.0.0', port=args.port)


def load_script(script_path):
    global script

    with open(script_path) as f:
        line = 'dummy'
        while line:
            line = f.readline()
            line = line.strip()
            if len(line) == 0 or line[0] == '#':
                continue
            comps = line.split(' ')
            script.append(comps[0])
    set_state(0)


def set_state(clk):
    global state
    state = {
        'clock': clk,
        'status': script[clk]
    }


@app.route('/status')
def index():
    return jsonify(state)


@app.route('/clock/<int:clk>')
def clock(clk):
    set_state(clk)
    return jsonify(state)


@app.route('/block/all')
def block_all():
    return jsonify({'message': 'TBD'})


@app.route('/block/latest')
def block_latest():
    return jsonify({'message': 'TBD', 'id': 42})


@app.route('/block/<int:blockid>')
def block_id(blockid):
    return jsonify({'message': 'TBD', 'id': blockid})


@app.route('/txpool/all')
def txpool_all():
    return jsonify({'message': 'TBD'})


def main():
    parser = argparse.ArgumentParser(
        description='Fake node for front testing.')
    parser.add_argument('--port', dest='port', default=10001, action='store',
                        help='port number')
    parser.add_argument('--script', dest='script', default='fake1.script', action='store',
                        help='fake script (default: fake.script)')

    args = parser.parse_args()
    run(args)


if __name__ == '__main__':
    main()
