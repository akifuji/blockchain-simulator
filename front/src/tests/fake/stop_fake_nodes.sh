ps -ef|grep fake_node.py|grep -v grep|awk '{print "kill "$2}'|bash