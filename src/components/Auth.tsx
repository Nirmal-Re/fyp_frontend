import { Box, Typography, TextField, Button } from "@mui/material";
import { LoginOutlined, HowToRegOutlined } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postsToAPI } from "../utils/fetchFromAPI";

type AuthProps = {
  isSignupValue: boolean;
};

const Auth = ({ isSignupValue }: AuthProps) => {
  const [isSignup, setIsSignup] = useState(isSignupValue);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  // const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  useEffect(() => {
    setIsSignup(isSignupValue);
  }, [isSignupValue]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); //This exist to prevent the page from reloading in case signup fails
    if (isSignup) {
      // signup
      postsToAPI("auth/register", {
        email,
        password,
        firstName,
        lastName,
      }).then((result) => console.log(result));
    } else {
      // login
      await postsToAPI("auth/login", { email, password })
        .then((result) => navigate("/dashboard", { state: result }))
        .catch((err) => console.log(err));
    }
  };

  //TODO can add compare password and confirm password

  const resetState = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setIsSignup(!isSignup);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems={"center"}
          margin="auto"
          marginTop={20}
          padding={3}
          borderRadius={5}
          boxShadow={"-5px 5px 10px #ccc"}
          sx={{ ":hover": { boxShadow: "-10px 10px 10px #ccc" } }}
        >
          <Typography variant="h2"> {isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && (
            <TextField
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              margin="normal"
              label="First Name"
              required
            />
          )}
          {isSignup && (
            <TextField
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              margin="normal"
              label="Last Name"
              required
            />
          )}
          {
            <TextField
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              margin="normal"
              type={"email"}
              label="Email"
              required
            />
          }
          {
            <TextField
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              margin="normal"
              type={"password"}
              label="Password"
              required
            />
          }
          <Button
            type="submit"
            endIcon={isSignup ? <HowToRegOutlined /> : <LoginOutlined />}
            sx={{ borderRadius: 3 }}
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>

          <Typography variant="caption">
            {isSignup ? "Have an account?" : "Don't have an account?"}
          </Typography>
          <Button sx={{ padding: 0 }}>
            <Typography onClick={() => resetState()} variant="caption">
              {isSignup ? "Login" : "Signup"}
            </Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Auth;
