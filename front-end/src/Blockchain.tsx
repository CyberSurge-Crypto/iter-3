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
            <h5>Transaction Pool</h5>
            <Pool />
          </div>
        </div>
      </div>
    </div>
  );
}
