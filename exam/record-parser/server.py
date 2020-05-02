# coding:utf-8
import socket
from multiprocessing import Process
from pprint import pprint
from socket import socket
from socket import AF_INET, SOCK_STREAM


def handle_client(_socket):
    _ = _socket.recv(1024)
    resp = "HTTP/1.1 200 OK\r\nA: B\r\n\r\nSuccess"
    _socket.send(bytes(resp, "utf-8"))
    _socket.close()


def create_server(_port):
    _server: socket = socket(AF_INET, SOCK_STREAM)
    _server.bind(('', _port))
    _server.listen(128)
    return _server


def handle_request(_socket, _address):
    pprint("Income request")
    _proc = Process(target=handle_client, args=(_socket,))
    _proc.start()


if __name__ == "__main__":
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(("", 8000))
    server_socket.listen(128)

    while True:
        client_socket, client_address = server_socket.accept()
        print("[%s, %s]用户连接上了" % client_address)
        handle_client_process = Process(target=handle_client, args=(client_socket,))
        handle_client_process.start()
        client_socket.close()
