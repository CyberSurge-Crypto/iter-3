import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { sendTransaction } from "../util/api"

type BannerProps = {
  publicKey: string;
  balance: number;
  countDown: number;
};

export default function Banner({ publicKey, balance, countDown }: BannerProps) {
  const [show, setShow] = useState(false);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  const [showKey, setShowKey] = useState(false);

  const handleTransaction = async () => {
    console.log("[handleTransaction] Transaction Data:", { sender, receiver, amount });
    // TODO: Send transaction to backend here
    const payload = {sender: sender, receiver: receiver, amount: amount};
    const response = await sendTransaction(payload);
    setShow(false); // Close modal
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 rounded">
        <div>
          <strong>Public Key: </strong>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowKey(true)}
          >
            Show
          </button>
        </div>
        <div>Page update in {countDown} s</div>
        <div className="d-flex align-items-center gap-3">
          <strong>Balance:</strong> {balance} 🪙
          <button className="btn btn-success" onClick={() => setShow(true)}>
            Start Transaction
          </button>
        </div>
      </div>

      {/* Transaction Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sender public key"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter receiver public key"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTransaction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Public Key Modal */}
      <Modal show={showKey} onHide={() => setShowKey(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Public Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={publicKey}
            readOnly
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <small className="text-muted">Click to select and copy.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowKey(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
