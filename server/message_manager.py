import json


MSG_ADD = 0
MSG_PING = 1


class MessageManager:
    def __init__(self):
        print('Initializing MessageManager ...')

    def build(self, msg_type, my_port=50082, payload=None):
        message = {
            'msg_type': msg_type,
            'my_port': my_port
        }
        if payload is not None:
            message['payload'] = payload

        return json.dumps(message)

    def parse(self, msg):
        msg = json.loads(msg)
        cmd = msg.get('msg_type')
        my_port = msg.get('my_port')
        payload = msg.get('payload')
        return (cmd, my_port, None)

