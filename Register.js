import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/book-hotel");
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <Container maxWidth="sm">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{ padding: "20px", borderRadius: "10px" }}
              >
                <Typography variant="h5" align="center" gutterBottom>
                  Register
                </Typography>
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate(`/book-hotel`)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
};

export default Register;
