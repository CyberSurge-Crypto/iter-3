import { useState } from "react";
import Banner from "./Banner";

export default function Blockchain() {
  const [user_key, setUserKey] = useState<string>("example_key");
  const [balance, setBalance] = useState<number>(0);

  return (
    <div className="container">
      <Banner publicKey={user_key} balance={balance} />
      {/* Blockchain View - full width */}
      <div className="row mt-3">
        <div className="col-12">
          <div
            className="border p-3 bg-light"
            style={{ height: "30vh", overflowY: "auto" }}
          >
            BlockchainView
          </div>
        </div>
      </div>

      {/* Log and Transaction Pool - side by side */}
      <div className="row mt-3" style={{ height: "50vh" }}>
        <div className="col-6">
          <div className="border p-3 bg-white h-100 overflow-auto">
            <h5>Notification Log</h5>
            Log View
          </div>
        </div>
        <div className="col-6">
          <div className="border p-3 bg-white h-100 overflow-auto">
            <h5>Transaction Pool</h5>
            TransactionPool
          </div>
        </div>
      </div>
    </div>
  );
}
