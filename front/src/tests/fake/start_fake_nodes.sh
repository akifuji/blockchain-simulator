#!/bin/bash

nohup python fake_node.py --port 10001 --script fake1.script&
nohup python fake_node.py --port 10002 --script fake2.script&
nohup python fake_node.py --port 10003 --script fake3.script&