import { useState } from "react";
import Banner from "./Banner";
import BlockchainView from "./BlockchainView";
import Log from "./Log";
import Pool from "./Pool";
import blockchainData from "./blockchain.json";

export default function Blockchain() {
  const [user_key, setUserKey] = useState<string>("example_key");
  const [balance, setBalance] = useState<number>(0);

  // Example Log message
  const [logs, setLogs] = useState<string[]>([
    "System initialized...",
    "Listening for peers...",
  ]);

  const addLog = () => {
    setLogs((prev) => [
      ...prev,
      `New event at ${new Date().toLocaleTimeString()}`,
    ]);
  };
  
  // Example pool data
  const [transactionPool, setTransactionPool] = useState([
    {
      transaction_id: "tx1",
      timestamp:"2025-03-21T13:29:31.563389",
      sender: "Alice",
      receiver: "Bob",
      amount: 50,
      signature: "11b4ecb7578235f1fe5069a8211cbdde097c97594d670ad3815e55edddab7321d3c2b5b241492cdbf8fbf1b8cb98daef15b112dafce6002bbdbacaf256effba765f66c1818a410924849860916e4adf1fe88c2153debd93c624a83b638b2d7b9e8e0e68a049698a0a6d42e84c558bb4f1426924645c8389402561fe95ee7ccf97d315e205fb06aab0c82346f2d615c9337579f4f8b94b8a3208c738204b2327060e2954f0be5b37e39ea7f7e74d75f527211d05007d4e1f79da6a06a297b8855b3a7e766c83ff96acffc55ddced75821afde5680d6dfc6d7fadc3313fe3ada5c06a04b7a9992ee1d5a450c20dd2b452019ec274c49bab993e56f89936a1c7479",
    },
    {
      transaction_id: "tx2",
      timestamp:"2025-03-22T10:29:31.563389",
      sender: "Charlie",
      receiver: "Dave",
      amount: 20,
      signature: "01b4ecb7578235f1fe5069a8211cbdde097c97594d670ad3815e55edddab7321d3c2b5b241492cdbf8fbf1b8cb98daef15b112dafce6002bbdbacaf256effba765f66c1818a410924849860916e4adf1fe88c2153debd93c624a83b638b2d7b9e8e0e68a049698a0a6d42e84c558bb4f1426924645c8389402561fe95ee7ccf97d315e205fb06aab0c82346f2d615c9337579f4f8b94b8a3208c738204b2327060e2954f0be5b37e39ea7f7e74d75f527211d05007d4e1f79da6a06a297b8855b3a7e766c83ff96acffc55ddced75821afde5680d6dfc6d7fadc3313fe3ada5c06a04b7a9992ee1d5a450c20dd2b452019ec274c49bab993e56f89936a1c7479",
    },
  ]);

  // Example mine handler
  const handleMine = () => {
    setLogs((prev) => [
      ...prev,
      `⛏️ Mining ${transactionPool.length} transaction(s)...`,
    ]);
    // Later: trigger mining logic here
  };
  return (
    <div className="container">
      <Banner publicKey={user_key} balance={balance} />
      {/* Blockchain View - full width */}
      <div className="row mt-3">
        <div className="col-12">
          <div
            className="border p-3 bg-light"
            style={{ height: "40vh", overflowY: "auto" }}
          >
            <BlockchainView chain={blockchainData[0].chain} />
          </div>
        </div>
      </div>

      {/* Log and Transaction Pool - side by side */}
      <div className="row mt-3" style={{ height: "50vh" }}>
        <div className="col-6">
          <div className="border p-3 bg-white h-100 overflow-auto">
            <button className="btn btn-primary mb-2" onClick={addLog}>
              Add Log Entry
            </button>
            <Log messages={logs} />
          </div>
        </div>
        <div className="col-6">
          <div className="border p-3 bg-white h-100 overflow-auto">
            <Pool transactions={transactionPool} onMine={handleMine} />
          </div>
        </div>
      </div>
    </div>
  );
}
