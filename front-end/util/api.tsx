import axios from 'axios';

type TransactionRequest = {
    sender: string;
    receiver: string;
    amount: number;
  };  

const api = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 1000
});

/**
 * send a Transaction to the API
 * @param txn the transaction request 
 * @returns a real pending transaction? true/false?
 */
export const sendTransaction = async (txn: TransactionRequest): Promise<any> => {
    try {
        const response = await api.post("/send-transaction", txn);
        console.log("[sendTransaction] result", response);
        return response;
    } catch (error) {
        console.error("[sendTransaction] error", error);
        throw error;
    }
}

/**
 */
export const mineBlock = async () => {
    try {
        const response = await api.post("/mine-block");
        console.log("[mineBlock] result", response);
        return response;
    } catch (error) {
        console.error("[mineBlock] error", error);
        throw error;
    }
}

/**
 */
export const fetchUserBalance = async () => {
    try {
        const response = await api.post("/user-balance");
        console.log("[fetchUserBalance] result", response);
        return response;
    } catch (error) {
        console.error("[fetchUserBalance] error", error);
        throw error;
    }
}

/**
 */
export const fetchPendingTransactions = async () => {
    try {
        const response = await api.post("/pending-transactions");
        console.log("[fetchPendingTransactions] result", response);
        return response;
    } catch (error) {
        console.error("[fetchPendingTransactions] error", error);
        throw error;
    }
}

/**
 * fetch the logs from the API (what do logs mean? user behavior?)
 * @returns a real pending transaction? true/false?
 */
export const fetchLogs = async () => {
    try {
        const response = await api.post("/logs");
        console.log("[fetchLogs] result", response);
        return response;
    } catch (error) {
        console.error("[fetchLogs] error", error);
        throw error;
    }
}

/**
 * fetch the transaction pool from the API
 * @returns a transaction pool in the form of ___
 */
export const fetchTransactionPools = async () => {
    try {
        const response = await api.post("/transaction-pools");
        console.log("[fetchTransactionPools] result", response);
        return response;
    } catch (error) {
        console.error("[fetchTransactionPools] error", error);
        throw error;
    }
}