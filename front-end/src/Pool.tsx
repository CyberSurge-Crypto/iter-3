type Transaction = {
  transaction_id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  amount: number;
  signature: string;
};

type TransactionPoolProps = {
  transactions: Transaction[];
  onMine: () => void;
};

export default function Pool({ transactions, onMine }: TransactionPoolProps) {

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}/${month}/${day}`;
  };
  
  return (
    <div className="h-100 d-flex flex-column">
      <button className="btn btn-warning mb-3" onClick={onMine}>⛏️ Mine Them</button>
      <div className="flex-grow-1 overflow-auto">
        <table className="table table-striped table-bordered table-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Signature</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.transaction_id}>
                <td>{tx.transaction_id.slice(0, 8)}...</td>
                <td>{tx.sender.slice(0, 8)}...</td>
                <td>{tx.receiver.slice(0, 8)}...</td>
                <td>{tx.amount}</td>
                <td>{formatTimestamp(tx.timestamp)}</td>
                <td>{tx.signature.slice(0, 8)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
