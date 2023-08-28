// LoginForm.tsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface User {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUserJSON = localStorage.getItem("currentUser");
    if (storedUserJSON) {
      const storedUser: User = JSON.parse(storedUserJSON);

      if (
        storedUser.username === username &&
        storedUser.password === password
      ) {
        alert("Login successful!");
        // Implement your logic for routing or displaying content after successful login
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("User not found.");
    }

    // Clear input fields after login attempt
    setUsername("");
    setPassword("");
  };

  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
