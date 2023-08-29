import { Modal, Button } from "@mui/material";
import { useState } from "react"; // Import useState

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username and password.");
      return;
    }

    onLogin(username, password);
    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
