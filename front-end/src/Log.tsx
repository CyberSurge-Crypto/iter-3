import { useEffect, useRef } from "react";

type LogProps = {
  messages: string[];
};

export default function Log({ messages }: LogProps) {
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTo({
        top: logRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={logRef}
      className="h-100 overflow-auto bg-dark text-light p-2 rounded"
      style={{ fontFamily: "monospace", fontSize: "0.9rem" }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className="log-message"
          style={{ transition: "transform 0.3s ease" }}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
