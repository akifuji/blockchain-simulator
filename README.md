# Blockchain Simulator

## 登場人物
* node: node1, node2, node3
* account: aki, so, satoshi
* controller

## API (controllers - nodes)
* https://$node-simulator-host:$port/$api
	* eg.) curl -X GET http://localhost:10001/status

### HTTP GET
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
	* idle
	* mining
	* broadcasting-block
	* broadcasting-tx
	* receiving-block
	* receiving-tx

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

#### transactionpool/all
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
#### transaction/addrequest
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
* ACK_BLOCK
* NEW_TX
* ACK_TX
