import axios from 'axios';
import {Block, Transaction, TransactionRequest} from "./types"

const api = axios.create({
    baseURL: "http://localhost:" + __API_PORT__,
    timeout: 1000
});

/**
 * send a new Transaction POST request to the API
 * @param txn the transaction request 
 * @returns {boolean} transaction sending status: 
 *      if successfully sending a transaction, return true,
 *      if the sending failed, return false
 */
export const sendTransaction = async (txn: TransactionRequest): Promise<boolean> => {
    try {
        const response = await api.post("/send-transaction", txn);
        console.log("[sendTransaction] result", response);
        return response.data;
    } catch (error) {
        console.error("[sendTransaction] error", error);
        throw error;
    }
}

/**
 * send a mine-block POST request to the backend API
 * @param None
 * @returns {Block} a new Block in the format of JSON
 */
export const mineBlock = async (): Promise<Block> => {
    try {
        const newBlock = await api.post("/mine-block");
        console.log("[mineBlock] result", newBlock);
        return newBlock.data;
    } catch (error) {
        console.error("[mineBlock] error", error);
        throw error;
    }
}

/**
 * send a balance GET request to the backend API
 * @param None
 * @returns {number} an integer if the request is handled successfully
 */
export const fetchUserBalance = async (): Promise<number> => {
    try {
        const balance = await api.get("/user-balance");
        console.log("[fetchUserBalance] result", balance);
        return balance.data;
    } catch (error) {
        console.error("[fetchUserBalance] error", error);
        throw error;
    }
}

/**
 * send a blockchain GET request to the backend API
 * @param None
 * @returns {Array<Block>} a JSON that
 *      shows an array blocks that the p2p node has confirmed
 */
export const fetchBlockchain = async (): Promise<Array<Block>> => {
    try {
        const blockchain = await api.get("/blockchain");
        console.log("[fetchBlockchain] result", blockchain);
        return blockchain.data;
    } catch (error) {
        console.error("[fetchBlockchain] error", error);
        throw error;
    }
}

/**
 * send a transaction pool GET request to the backend API
 * @param None
 * @returns {Array<Transaction>} a JSON that
 *      shows the transactions that have not been mined
 */
export const fetchTransactionPool = async (): Promise<Array<Transaction>> => {
    try {
        const transactionPool = await api.get("/transaction-pool");
        console.log("[fetchTransactionPool] result", transactionPool);
        return transactionPool.data;
    } catch (error) {
        console.error("[fetchTransactionPool] error", error);
        throw error;
    }
}

/**
 * send a log GET request to the backend API
 * @param None
 * @returns {Array<string>} the logs of the backend, including P2P network behaviors and blockchain behaviors
 */
export const fetchLogs = async (): Promise<Array<string>> => {
    try {
        const response = await api.get("/logs");
        console.log("[fetchLogs] result", response);
        return response.data;
    } catch (error) {
        console.error("[fetchLogs] error", error);
        throw error;
    }
}
