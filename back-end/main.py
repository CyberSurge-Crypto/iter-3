from api import app
import uvicorn
import argparse
import logging
import copy

from p2p import StaticNode, PeerNode, STATIC_NODE_IP, STATIC_NODE_PORT, node_callback

from bcf import blockchain

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Start the API server')
    parser.add_argument('--port', type=int, default=8000, help='Port to run the server on (default: 8000)')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host to run the server on (default: 0.0.0.0)')
    parser.add_argument('--p2p-port', type=int, default=8001, help='P2P port to run the server on (default: 8001)')
    parser.add_argument('--start-p2p', action='store_true', help='Start P2P server')

    args = parser.parse_args()

    if args.start_p2p:
        # run p2p server
        static_node = StaticNode(STATIC_NODE_IP, STATIC_NODE_PORT, node_callback)
        static_node.debug = True
        static_node.start()
        logger.info(f"P2P server started on {args.host}:{args.p2p_port}")
    else:
        logger.info(f"P2P server not started")

    # run p2p node
    p2p_node = PeerNode(args.host, args.p2p_port, max_connections=999, callback=node_callback)

    p2p_node.blockchain = copy.deepcopy(blockchain)
    p2p_node.save_blockchain(p2p_node.blockchain)
    logger.info(f"Blockchain saved")

    p2p_node.debug = True
    p2p_node.start()
    logger.info(f"P2P node started on {args.host}:{args.p2p_port}")

    p2p_node.register()
    logger.info(f"P2P node registered")

    # run api server
    uvicorn.run(app, host=args.host, port=args.port)