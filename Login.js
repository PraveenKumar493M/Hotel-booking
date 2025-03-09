import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const response = await fetch("/users.json");
      const users = await response.json();

      const validUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (validUser) {
        navigate(`/book-hotel/${validUser.id}`);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Failed to authenticate");
    }
  };

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
