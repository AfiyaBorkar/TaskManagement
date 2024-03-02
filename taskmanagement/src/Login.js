import React, { useState,useContext,useEffect } from "react";
import "./mystyle.css";

import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Toaster from "./Toaster";
import axios from "axios";
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from './context/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const [Data, setData] = useState({ username: "", password: "" });
  const [LoginStatus, setLoginStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setloading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const changeHandler = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        // "http://localhost:5000/api/user/login",
        process.env.REACT_APP_BACKEND_URL+`user/login`,

        
        {
          username: Data.username,
          password: Data.password,
        },
        config
      );

            // console.log(response);

      // Set the Authorization header for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;

      setLoginStatus({ msg: "Success", key: Math.random(), variant:"success" });
      // navigate("/");
      console.log("token hai hy ", response.data.data.token)
      login(response.data.data.token);
      // window.location.href="/"
      localStorage.setItem("userInfor", JSON.stringify(response.data.data._id));
    setUserId(response.data.data._id)
      localStorage.setItem("AuthToken", JSON.stringify(response.data.data.token));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setLoginStatus({
          msg: "Invalid Username or Password",
          key: Math.random(),
          variant:"warning"
        });
      }
      if(Data.username=="" && Data.password==""){
        setLoginStatus({
          msg: "None of the field should be empty",
          key: Math.random(),
          variant:"warning"
        });
      }

      setloading(false);
    }
  };
  useEffect(() => {
    // Redirect to home page after successful login
    if (LoginStatus.msg === "Success") {
      // navigate(`/${userId}`);
      window.location.href =`/${userId}`
    }
  }, [LoginStatus, navigate]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="main-container">
      <div className="login-container">
        <div className="login-main-cont">
        <div className="image-conatiner">
          {/* <img src={logo} alt="logo" className="login-img" /> */}
          <p>TaskManager</p>
        </div>

        <div className="login-box">
          {/* <img src={pic} alt="pic" /> */}

          <p className="logintext">Login <LoginIcon sx={{fontSize:20}}/></p>
          
          <TextField
            id="outlined-required"
            label="Username"
            variant="outlined"
            onChange={changeHandler}
            name="username"
          />
        
          <TextField
            onChange={changeHandler}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
        
          <Button variant="outlined" onClick={loginHandler} >
            Login
          </Button>

          <h6 className="logintext">
            Don't have an account? 
            <a href="/signup"onClick={handleLoginClick} >
                Create Account
            </a>
          </h6>
          {LoginStatus ? (
            <Toaster key={LoginStatus.key} message={LoginStatus.msg} variant={LoginStatus.variant} />
          ) : null}
        </div>
        </div>
      </div>
      </div>
    </>
  );
}
