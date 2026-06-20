import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>TradeX</h1>
      <h2>{}</h2>
    </div>
  );
}

export default App;