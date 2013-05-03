
from __future__ import print_function

import argparse
import SimpleHTTPServer
import SocketServer

parser = argparse.ArgumentParser(description='Start up the server.')
parser.add_argument('-p', '--port', default=8080)

def run():
  handler = SimpleHTTPServer.SimpleHTTPRequestHandler
  httpd = SocketServer.TCPServer(("", ARGV.port), handler)
  print('Listening on http://localhost:{}/'.format(ARGV.port))
  httpd.serve_forever()

if __name__ == '__main__':
  ARGV = parser.parse_args()
  run()
