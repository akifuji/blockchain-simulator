from node import Node

def main():
    server = Node(50090, '172.20.10.9', 50082)
    server.start()
    server.join_network()

if __name__ == '__main__':
    main()