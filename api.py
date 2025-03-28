import fastapi
import uvicorn

from bcf import blockchain, Transaction
from models.Response import success_response

app = fastapi.FastAPI()

@app.get("/")
def read_root():
  return success_response({
    "message": "Hello, World!"
  })

@app.post("/send-transaction")
def send_transaction(transaction):
  blockchain.add_transaction(transaction)
  return success_response(None)

@app.post("/mine-block")
def mine_block():
  blockchain.mine_block()
  return success_response(None)

@app.get("/user-balance")
def user_balance(address):
  return success_response({
    "balance": blockchain.get_balance(address)
  })

@app.get("/pending-transactions")
def pending_transactions():
  return success_response({
    "pending_transactions": blockchain.pending_transactions
  })

@app.get("/logs")
def logs():
  pass

@app.get("/transaction-pools")
def transaction_pools():
  return success_response({
    "transaction_pools": blockchain.transaction_pools
  })


if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port=8000)