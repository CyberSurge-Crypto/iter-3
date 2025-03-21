type BannerProps = {
  publicKey: string;
  balance: number;
};

export default function Banner({ publicKey, balance }: BannerProps) {
  return (
      <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 rounded">
        <div>
          <strong>Public Key:</strong> {publicKey}
        </div>
        <div>
          <strong>Balance:</strong> {balance} 🪙
          <button
            className="btn btn-success"
          >
            Start Transaction
          </button>
        </div>
      </div>
  );
}
