import threading


class TransactionPool:
    def __init__(self):
        print('Initializing TransactionPool ...')
        self.transaction = []
        self.lock = threading.Lock()


    def set_new_transaction(self, transaction):
        with self.lock:
            print('set_new_transaction is called', transaction)
            self.transaction.append(transaction)


    def get_stored_transaction(self):
        if len(self.transaction) > 0:
            return self.transaction
        else:
            print("transaction pool is empty")
            return []