#!/bin/sh

# clock 0
# node1: idle
# node2: idle
curl -X GET http://localhost:50082/start
curl -X GET http://localhost:50083/start
curl -H "Content-type: application/json" -X POST -d '{"sender": "aki", "recipient": "so", "value": 3}' localhost:50082/tx/add

node1_status=$(curl -X GET http://localhost:50082/status)
if [ "$node1_status" != '{"clock": 0, "status": 1}' ]; then
    echo {"clock": 0, "status": 1} expected, but got $node1_status
    exit 1
fi
node1_txs=$(curl -X GET http://localhost:50082/txPool/all)
if [ "$node1_txs" != '[]' ]; then
    echo [] expected, but got $node1_txs
    exit 1
fi


# clock 1
# node1: received_tx
# node2: idle
curl -X GET http://localhost:50082/clock/1
curl -X GET http://localhost:50083/clock/1

node1_status=$(curl -X GET http://localhost:50082/status)
if [ "$node1_status" != '{"clock": 1, "status": 6}' ]; then
    echo {"clock": 1, "status": 6} expected, but got $node1_status
    exit 1
fi

node2_status=$(curl -X GET http://localhost:50083/status)
if [ "$node2_status" != '{"clock": 1, "status": 1}' ]; then
    echo {"clock": 1, "status": 1} expected, but got $node2_status
    exit 1
fi

node1_txs=$(curl -X GET http://localhost:50082/txPool/all)
if [ "$node1_txs" != '[{"sender": "aki", "recipient": "so", "value": 3}]' ]; then
    echo [{"sender": "aki", "recipient": "so", "value": 3}] expected, but got $node1_txs
    exit 1
fi

# clock 2
# node1: broadcasted_tx
# node2: received_tx
curl -X GET http://localhost:50082/clock/2
curl -X GET http://localhost:50083/clock/2

node1_status=$(curl -X GET http://localhost:50082/status)
if [ "$node1_status" != '{"clock": 2, "status": 4}' ]; then
    echo {"clock": 2, "status": 4} expected, but got $node1_status
    exit 1
fi

node2_status=$(curl -X GET http://localhost:50083/status)
if [ "$node2_status" != '{"clock": 2, "status": 6}' ]; then
    echo {"clock": 2, "status": 6} expected, but got $node2_status
    exit 1
fi

node2_txs=$(curl -X GET http://localhost:50083/txPool/all)
if [ "$node2_txs" != '[{"sender": "aki", "recipient": "so", "value": 3}]' ]; then
    echo [{"sender": "aki", "recipient": "so", "value": 3}] expected, but got $node2_txs
    exit 1
fi

# clock 3
# node1: idle
# node2: broadcasted_tx
curl -X GET http://localhost:50082/clock/3
curl -X GET http://localhost:50083/clock/3

node1_status=$(curl -X GET http://localhost:50082/status)
if [ "$node1_status" != '{"clock": 3, "status": 1}' ]; then
    echo {"clock": 3, "status": 1} expected, but got $node1_status
    exit 1
fi

node2_status=$(curl -X GET http://localhost:50083/status)
if [ "$node2_status" != '{"clock": 3, "status": 4}' ]; then
    echo {"clock": 3, "status": 4} expected, but got $node2_status
    exit 1
fi