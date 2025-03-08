import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice";
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import Login from "./Login";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ storeName: "", email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <Container //maxWidth="xs"
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
    }}
    >
       <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
      <Paper
          elevation={5}
          sx={{
            padding: "30px",
            textAlign: "center",
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
        <Typography variant="h4" mb={2}>Signup</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField 
            fullWidth 
            label="Store Name" 
            name="storeName" 
            value={formData.storeName} 
            onChange={handleChange} 
            margin="normal"
            sx={{
              input: { color: "#fff" },
              label: { color: "#ddd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#fff" },
              },
            }}
          />
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            margin="normal"
            sx={{
              input: { color: "#fff" },
              label: { color: "#ddd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#fff" },
              },
            }}
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            margin="normal"
            sx={{
              input: { color: "#fff" },
              label: { color: "#ddd" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#fff" },
              },
            }}
          />
           <motion.div whileTap={{ scale: 0.9 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "#ff7eb3",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#ff4e75" },
              transition: "0.3s ease",
            }}
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>
          </motion.div>
        </form>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
        <Typography mt={2}>Already have an account?{" "}
        <Link to="/login" style={{ color: "#ff7eb3", fontWeight: "bold" }}>
        Login here
            </Link>
          </Typography>
      </Paper>
     
      </motion.div>
    </Container>
  );
};

export default Signup;