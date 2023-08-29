import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username and password.");
      return;
    }

    const user = {
      id: uuidv4,
      username: username,
      password: password,
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    setUsername("");
    setPassword("");

    alert("Registration complete");
  };

  return (
    <>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </>
  );
};

export default RegistrationForm;
