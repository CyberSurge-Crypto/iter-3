import fastapi
import uvicorn

app = fastapi.FastAPI()

@app.get("/")
def read_root():
  return {"message": "Hello, World!"}

@app.post("/send-transaction")
def send_transaction():
  pass

@app.post("/mine-block")
def mine_block():
  pass

@app.get("/user-balance")
def user_balance():
  pass

@app.get("/pending-transactions")
def pending_transactions():
  pass

@app.get("/logs")
def logs():
  pass

@app.get("/transaction-pools")
def transaction_pools():
  pass


if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port=8000)