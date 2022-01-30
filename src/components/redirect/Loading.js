import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Loading = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");
    return () => clearInterval(interval);
  });

  return (
    <div className="text-center">
      <p className="m-0 p-5">Redirecting you in {count} seconds</p>
    </div>
  );
};

export default Loading;
