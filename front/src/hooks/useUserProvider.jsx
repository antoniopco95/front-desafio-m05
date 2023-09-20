import { useState } from "react";

function UseUserProvider() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  return { name, setName, id, setId };
}

export default UseUserProvider;
