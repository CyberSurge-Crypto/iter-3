export type TransactionRequest = {
    sender: string;
    receiver: string;
    amount: number | string;
};

export type Transaction = {
    transaction_id: string,
    timestamp: string,
    sender: string,
    receiver: string,
    amount:  string | number,
    signature: string
}

export type Block = {
    index: number;
    transactions: Transaction[] | null
}