import { useEffect, useState } from "react";

const Clock = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000 * 60);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {dateState.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "numeric",
        hour12: false,
      })}
    </div>
  );
};

export default Clock;
