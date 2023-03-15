import React, { useState } from "react";
import "./login.scss";
import { newRequest } from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const nav = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", details);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      nav("/");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <div className="login">
      <form action="" className="form" onSubmit={handleSubmit}>
        <h1>SIGN IN</h1>
        <label htmlFor="">Username</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
