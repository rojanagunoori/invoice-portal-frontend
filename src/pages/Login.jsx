import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/"); // Redirect to home on success
      }
    });
    ;
    console.log("loged sucess")
  };

  return (
    <>
   

    <Container // maxWidth="xs" 
    elevation={5} 
           sx={{
           
            
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
          }}>
    <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0 , scale: 1}}
        transition={{ duration: 0.8 }}
      >
      <Paper style={{ padding: "20px", marginTop: "50px" }}
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
        <Typography variant="h4"  fontWeight="bold" sx={{ color: "#fff" }} gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" name="email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}//onChange={handleChange} 
          sx={{
            input: { color: "#fff" },
            label: { color: "#ddd" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#fff" },
            },
          }} />
          <TextField fullWidth margin="normal" label="Password" type="password" name="password"  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} //onChange={handleChange} 
           sx={{
            input: { color: "#fff" },
            label: { color: "#ddd" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#fff" },
            },
          }}/>
             <motion.div whileTap={{ scale: 0.9 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: "#ff7eb3",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ff4e75" },
            transition: "0.3s ease",
          }}
          >{loading ? "Logging in..." : "Login"}</Button>
          </motion.div>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Typography mt={2}> Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#ff7eb3", fontWeight: "bold" }}>
              Signup here
            </Link></Typography>
      </Paper>
      </motion.div>
    </Container>
    </>
  );
};

export default Login;
