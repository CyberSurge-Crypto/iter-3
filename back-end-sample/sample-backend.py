from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import random
import uvicorn
import json
import sys

app = FastAPI()

# CORS setup for local frontend communication (e.g., localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/user-balance")
async def get_balance():
    try:
        data = random.randint(1,8)
        return JSONResponse(content=data)
    except:
        return JSONResponse(content={"error": "No valid result"}, status_code=404)

@app.get("/blockchain")
async def get_blockchain():
    try:
        with open("./sample-blockchain.json", "r") as file:
            data = json.load(file)
        return JSONResponse(content=data)
    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)

@app.get("/transaction-pool")
async def get_blockchain():
    try:
        with open("./sample-pool.json", "r") as file:
            data = json.load(file)
        return JSONResponse(content=data)
    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)

fun_sentences = [
    "The sky is not the limit, it's just the beginning.",
    "I told my computer I needed a break, and it froze.",
    "Dancing like nobody’s watching is great… until you’re in a Zoom meeting.",
    "Some bugs fix themselves when you turn your back. Magic!",
    "I like my code like I like my coffee: strong and without too many errors.",
    "My cat just sent an email. I guess she’s hired now.",
    "404: Joke not found. But here's a smile anyway :)"
]

@app.get("/logs")
async def get_fun_sentences():
    try:
        selected = random.sample(fun_sentences, k=5)
        return JSONResponse(content=selected)
    except:
        return JSONResponse(content={"error": "No fun logs"}, status_code=404)

# Receive and print JSON data from POST request
@app.post("/post-data")
async def post_data(request: Request):
    data = await request.json()
    print("Received JSON:", data)
    return {"message": "JSON received successfully", "data": data}

if __name__ == "__main__":
    port = 8000  # default
    if len(sys.argv) >= 3 and sys.argv[1] == "port":
        try:
            port = int(sys.argv[2])
        except ValueError:
            print("Invalid port number. Using default 8000.")
    uvicorn.run("sample-backend:app", host="0.0.0.0", port=port, reload=True)