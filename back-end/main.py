import uvicorn
import argparse

from p2p import StaticNode, STATIC_NODE_IP, STATIC_NODE_PORT, node_callback
from setup import setup

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Start the API server')
    parser.add_argument('--port', type=int, default=8000, help='Port to run the server on (default: 8000)')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to run the server on (default: 0.0.0.0)')
    parser.add_argument('--p2p-port', type=int, default=8001, help='P2P port to run the server on (default: 8001)')

    parser.add_argument('--static-node', action='store_true', help='Start static node')

    args = parser.parse_args()

    if args.static_node:
      # run static node
      static_node = StaticNode(STATIC_NODE_IP, STATIC_NODE_PORT, node_callback)
      static_node.debug = False
      static_node.start()
    else:
      setup(p2p_host=args.host, p2p_port=args.p2p_port)

      from api import app
      uvicorn.run(app, host=args.host, port=args.port)