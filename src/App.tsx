import { useState } from "react";
import "@/assets/style.scss";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="red">hello world!</div>
      <div>{count}</div>
      <div>
        <button onClick={() => setCount(state => state + 1)}>カウント</button>
      </div>
    </div>
  );
}
