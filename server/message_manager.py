import json


MSG_ADD = 0
MSG_NEW_BLOCK = 1
MSG_NEW_TX = 2
MSG_ACK_BLOCK = 2
MSG_ACK_TX = 3


class MessageManager:
    def __init__(self):
        return

    @staticmethod
    def build(msg_type, my_port, payload=None):
        message = {
            'msg_type': msg_type,
            'my_port': my_port
        }
        if payload is not None:
            message['payload'] = payload
        return json.dumps(message)

    @staticmethod
    def parse(msg):
        msg = json.loads(msg)
        cmd = msg.get('msg_type')
        my_port = msg.get('my_port')
        payload = msg.get('payload')
        return (cmd, my_port, payload)

