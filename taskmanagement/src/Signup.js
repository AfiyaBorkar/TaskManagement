import React, { useState,useContext,useEffect } from "react";
import "./mystyle.css";
// import logo from "../icons/bigchat.png";
// import pic from "../icons/user.png";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Toaster from "./Toaster";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from './context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const [Data, setData] = useState({ username: "", password: "" });
  const [SignUpStatus, setSignUpStatus] = useState("");
  const [loading, setloading] = useState(false);
  const { login } = useContext(AuthContext);
  const [userId, setUserId] = useState("");


  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const changeHandler = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const SignUpHandler = async (e) => {
    e.preventDefault();
    setloading(true);

    // console.log(Data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        // "http://localhost:5000/api/user/register",
        process.env.REACT_APP_BACKEND_URL+`user/register`,

        {
          username: Data.username,
          password: Data.password,
        },
        config
      );
      // console.log(response);
      setSignUpStatus({
        msg: "Success",
        key: Math.random(),
        variant: "success",
      });
      console.log("token hai: ",response.data.data.token)
      login(response.data.data.token);


      //   navigate("/");
      // window.location.href = "/login";
      localStorage.setItem("userInfor", JSON.stringify(response.data.data._id));
      setUserId(response.data.data._id)
      localStorage.setItem("AuthToken", JSON.stringify(response.data.data.token));
      setloading(false);
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        setSignUpStatus({
          msg: "Username already exists",
          key: Math.random(),
          variant: "warning",
        });
      } else if (error.response && error.response.status === 402) {
        setSignUpStatus({
          msg: "User with email already exists",
          key: Math.random(),
          variant: "warning",
        });
      } else if (error.response && error.response.status === 400) {
        setSignUpStatus({
          msg: "Try registering again",
          key: Math.random(),
          variant: "warning",
        });
      } else if (error.response && error.response.status === 405) {
        setSignUpStatus({
          msg: "All fields should be filled",
          key: Math.random(),
          variant: "warning",
        });
      } else {
        console.error("Unexpected error:", error);
        setSignUpStatus({
          msg: "Unexpected error occurred",
          key: Math.random(),
          variant: "error",
        });
      }

      setloading(false);
    }
  };
  useEffect(() => {
    // Redirect to home page after successful login
    if (SignUpStatus.msg === "Success") {
      // navigate(`/${userId}`);
    window.location.href=`/${userId}`

    }
  }, [SignUpStatus, navigate]);

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
          <div className="signup-main-cont">
            <div className="image-conatiner">
              {/* <img src={logo} alt="logo" className="login-img" /> */}
              <p>TaskManager</p>
            </div>

            <div className="login-box">
              {/* <img src={pic} alt="pic" /> */}
              <p className="logintext">
                SignUp <LoginIcon sx={{ fontSize: 20 }} />{" "}
              </p>
              <TextField
                id="outlined-required"
                label="username"
                variant="outlined"
                onChange={changeHandler}
                name="username"
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={changeHandler}
                name="password"
              />
              <Button variant="outlined" onClick={SignUpHandler}>SignUp</Button>
              <h6 className="logintext">
                Already Have Account? <a href="/login" onClick={handleLoginClick}>Login</a>
              </h6>
              {SignUpStatus ? (
                <Toaster
                  key={SignUpStatus.key}
                  message={SignUpStatus.msg}
                  variant={SignUpStatus.variant}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
