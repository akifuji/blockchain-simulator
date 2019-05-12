# Blockchain Simulator

## Server Getting Start
1. Activate venv. `$ source server/myvenv/bin/activate`
2. At `__init__` in `connection_manager.py`, choose how many peers to connect.
```python
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
``` 
3. Start node server. `$ python node1_server.py`
    - There are `node1_server.py`, `node2_server.py`, and `node3_server.py`
    - Each node's port is `50082`, `50083`, and `50084`
4. Send HTTP GET `start` for every nodes
5. You can send any APIs :tada:

## 登場人物
* node: node1, node2, node3
* account: aki, so, satoshi
* controller

### Genesis block
The genesis block has these three transactions.
```
[ {"sender": None, "recipient": "aki", "value": 2},
  {"sender": None, "recipient": "so", "value": 7},
  {"sender": None, "recipient": "satoshi", "value": 5} ]
```

## API (controllers - nodes)
* https://$node-simulator-host:$port/$api
	* eg.) curl -X GET http://localhost:10001/status

### HTTP GET
#### start
* activate node
* need to be used every time you start the program

#### reset
* reset state
* clock is 0, tx pool is empty, and chain contains the Genesis block only.

#### status
* return status in JSON
* return value
```json
{
	"clock": 1,
	"status": "idle"
}
```
* status type
	* 1: idle
	* 2: mining
	* 3: broadcasting-block
	* 4: broadcasting-tx
	* 5: receiving-block
	* 6: receiving-tx

#### block
block value
```json
{
	"id": 4,
	"hash": "5234ab...",
	"timestamp": "%Y/%m/%d %H:%M:%S",
	"transactions": [{"sender": "aki", "recipient": "so", "value": 3}],
	"previoud_block_hash": "d628e...",
	"nonde": 46
}
```

##### block/latest
* return a block for the given id in the node in JSON
* return block value

##### block/$blockid
* return the latest block in the node in JSON
* return HTTP 200 with the block value, if it exists
* return HTTP 404, if not

##### block/all
* return all blocks in the node in JSON
* return value
```json
{
	"length": 2,
	"blocks": [
			{ "id": 0, "hash: ..." },
			{ "id": 1, "hash: ..." }
		]
}
```

#### txPool/all
* return all transactions in the tx pool of the node in JSON
* return value
```json
{
	"sender": "aki",
	"recipient": "so",
	"value": 3
}
```

#### mine
* request the node to mine
	* at the next clock, the status of the node becomes “mining”
* return HTTP 200, no body

#### clock/$clock
* changes clock to the given value
* return HTTP 200, no body

### HTTP POST
#### tx/add
* request to add a transaction to the tx pool
* POST data: tx value
* return value
```json
{
	"result": "success"	// success | fail
}
```

## clockの消費
* mining: 3
* broadcasting-block: 1
* broadcasting-transaction: 1
* receiving-block: 1
* receiving-transaction: 1
* respond to controller: 0

## 初期状態
### node
* socketで繋がっている
* blockchainにはgenesis blockが入っている
* tx poolは空

### account
* akiに10コイン(genesis blockにtxが入っている)

## node内でのmessage type
* NEW_BLOCK
* NEW_TX
