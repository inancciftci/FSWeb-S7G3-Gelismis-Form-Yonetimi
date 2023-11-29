import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [members, setMembers] = useState([]);

  return (
    <div className="App container">
      <Form members={members} setMembers={setMembers} />
    </div>
  );
}

export default App;
