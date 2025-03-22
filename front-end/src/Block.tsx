type Transaction = {
  transaction_id: string;
  sender: string;
  receiver: string;
  amount: number;
  state: string;
};

type BlockProps = {
  index: number;
  hash: string;
  previous_hash: string;
  transactions: Transaction[];
  nonce: number;
};

export default function Block({ index, hash, previous_hash, transactions, nonce }: BlockProps) {
  return (
    <div className="border p-3 bg-white rounded shadow-sm m-2" style={{ minWidth: '300px' }}>
      <h5>Block #{index}</h5>
      <div><strong>Prev:</strong> {previous_hash.slice(0, 15)}...</div>
      <div><strong>Nonce:</strong> {nonce}</div>
      <hr />
      <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '0.8rem' }}>
        {transactions.map((tx) => (
          <div key={tx.transaction_id} className="mb-2">
            <div><strong>From:</strong> {tx.sender.slice(0, 10)}...</div>
            <div><strong>To:</strong> {tx.receiver.slice(0, 10)}...</div>
            <div><strong>Amt:</strong> {tx.amount}</div>
          </div>
        ))}
      </div>
      <hr />
      <div><strong>Hash:</strong> {hash.slice(0, 15)}...</div>
    </div>
  );
}
  