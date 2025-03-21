import { useEffect, useRef } from "react";
import Block from "./Block";

type BlockchainViewProps = {
  chain: any[];
};

export default function BlockchainView({ chain }: BlockchainViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [chain]);

  return (
    <div
      className="d-flex overflow-auto"
      style={{ minHeight: "100%", whiteSpace: "nowrap" }}
      ref={scrollRef}
    >
      {chain.map((block, index) => (
        <Block
          key={index}
          index={block.index}
          hash={block.hash}
          previous_hash={block.previous_hash}
          nonce={block.nonce}
          transactions={block.transactions}
        />
      ))}
    </div>
  );
}
