# create an enum for the state of a transaction
from enum import Enum

DIFFICULTY = 2
SYSTEM="SYSTEM_ADDRESS"
MINE_REWARD = 5

class TransactionState(Enum):
    STARTED = 'started'
    SIGNED = 'signed'
    FIRST_CONFIRMED = 'first_confirmed'
    FULLY_CONFIRMED = 'fully_confirmed'
    CANCELED = 'canceled'
    FAILED = 'failed'