from pydantic import BaseModel

class SendTransactionRequest(BaseModel):
  sender_address: str
  receiver_address: str
  amount: int

class MineBlockRequest:
  pass
