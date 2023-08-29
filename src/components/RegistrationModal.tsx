import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (username: string, password: string) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  open,
  onClose,
  onRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username and password.");
      return;
    }

    onRegister(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRegister} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
