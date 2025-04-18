import fastapi
import logging

from models.Response import success_response, error_response
from models.Request import SendTransactionRequest
from fastapi.middleware.cors import CORSMiddleware
from setup import user, p2p_node, logs_filename

logging.basicConfig(filename=logs_filename, level=logging.INFO)
logger = logging.getLogger(__name__)

app = fastapi.FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:8000"] for stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
  return success_response({
    "message": "Hello, World!"
  })

@app.post("/send-transaction")
def send_transaction(request: SendTransactionRequest):
  try:
    transaction = user.start_transaction(request.receiver_address, request.amount)
    p2p_node.blockchain.pending_transactions.append(transaction)

    # broadcast transaction to all peers
    p2p_node.save_blockchain(p2p_node.blockchain)
    p2p_node.broadcast_transaction(transaction.to_dict())

    #logger.info(f"Transaction sent: {transaction.to_dict()}")

    return success_response({
      "transaction": transaction.to_dict()
    })
  except Exception as e:
    #logger.info(f"Error sending transaction: {e}")
    return error_response(str(e))

@app.post("/mine-block")
def mine_block():
  new_block = p2p_node.blockchain.mine_pending_transactions(user.get_address())
  if new_block is not None:
    if p2p_node.blockchain.add_block(new_block):
      p2p_node.save_blockchain(p2p_node.blockchain)
      p2p_node.broadcast_block(new_block.to_dict())

      ##logger.info(f"Block mined")
      return success_response({
        "block": new_block.to_dict()
      })
    else:
      ##logger.info("Failed to add block")
      return error_response("Failed to add block")
  else:
    ##logger.info("Failed to mine block")
    return error_response("Failed to mine block")

@app.get("/user-balance")
def user_balance(address: str):
  ##logger.info(f"User balance requested for address: {address[:5]}...")
  return success_response({
    "balance": p2p_node.blockchain.get_balance(address)
  })

@app.get("/pending-transactions")
def pending_transactions():
  transactions = [tx.to_dict() for tx in p2p_node.blockchain.pending_transactions]
  ##logger.info("Pending transactions requested")
  return success_response({
    "pending_transactions": transactions
  })

@app.get("/logs")
def logs():
  with open(logs_filename, "r") as f:
    return success_response({
      "logs": f.read()
    })

@app.get("/transaction-pool")
def transaction_pool():
  transactions = [tx.to_dict() for tx in p2p_node.blockchain.pending_transactions]
  ##logger.info("Transaction pool requested")
  return success_response({
    "transaction_pool": transactions
  })

@app.get("/blockchain")
def blockchain():
  ##logger.info("Blockchain requested")
  return success_response({
    "blockchain": p2p_node.blockchain.get_chain_as_json()
  })

@app.get("/address")
def address():
  ##logger.info("Address requested")
  return success_response({
    "address": user.get_address()
  })