import React, { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (username: string, password: string, fullName: string) => void; // Add fullName parameter
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  open,
  onClose,
  onRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // State for user's full name

  const handleRegister = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      fullName.trim() === ""
    ) {
      alert("Please enter a valid username, password, and full name.");
      return;
    }

    onRegister(username, password, fullName); // Call the provided onRegister function
    setUsername("");
    setPassword("");
    setFullName("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        borderRadius={8}
        color={"white"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>Register</h1>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
