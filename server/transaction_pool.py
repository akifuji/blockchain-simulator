import threading


class TransactionPool:
    def __init__(self):
        print('Initializing TransactionPool ...')
        self.transaction = []
        self.lock = threading.Lock()

    def set_tx(self, tx):
        with self.lock:
            print('set_tx is called', tx)
            self.transaction.append(tx)

    def get_stored_transaction(self):
        if len(self.transaction) > 0:
            return self.transaction
        else:
            print("transaction pool is empty")
            return []