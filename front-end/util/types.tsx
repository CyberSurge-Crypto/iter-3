export type TransactionRequest = {
    sender_address: string;
    receiver_address: string;
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