import copy
import os
from bcf import Blockchain, User, Transaction, SYSTEM
from p2p import PeerNode, node_callback
import logging
import time

user = None
p2p_node = None
logs_filename = time.strftime("logs/%Y-%m-%d_%H-%M-%S.log")


def setup(p2p_host: str, p2p_port: int):
    global user, p2p_node, logs_filename

    user = User()
    p2p_node = PeerNode(p2p_host, p2p_port, logfilename=logs_filename, max_connections=999, callback=node_callback)

    # create logs directory if it doesn't exist
    os.makedirs(os.path.dirname(logs_filename), exist_ok=True)

    # save logs to file
    logging.basicConfig(filename=logs_filename, level=logging.INFO)
    logger = logging.getLogger(__name__)

    p2p_node.debug = True
    p2p_node.start()

    p2p_node.register()
    logger.info(f"P2P node registered")

    if len(p2p_node.all_nodes) == 0:
      blockchain = Blockchain()
      blockchain.create_genesis_block()
      p2p_node.blockchain = copy.deepcopy(blockchain)
      p2p_node.save_blockchain(p2p_node.blockchain)
      logger.info(f"No nodes connected, created genesis block")
    else:
      p2p_node.fetch_blockchain(p2p_node.all_nodes[0])
      logger.info(f"Nodes connected: {p2p_node.all_nodes}")
    
    # get airdrop for the user
    tx = Transaction(SYSTEM, user.get_address(), 100)
    logger.info(f"Airdropping {tx.amount} to {user.get_address()}")
    p2p_node.blockchain.pending_transactions.append(tx)
    logger.info(f"Pending transactions: {p2p_node.blockchain.pending_transactions}")
    new_block = p2p_node.blockchain.mine_pending_transactions()
    if new_block is not None:
      logger.info(f"Mined block: {new_block.to_dict()}")
      if p2p_node.blockchain.add_block(new_block):
        p2p_node.save_blockchain(p2p_node.blockchain)
        p2p_node.broadcast_block(new_block.to_dict())
        logger.info(f"Block added to blockchain and broadcasted")
      else:
        logger.info(f"Failed to add block to blockchain")
    else:
      logger.info(f"Failed to mine block")

    logger.info(f"Setup complete")