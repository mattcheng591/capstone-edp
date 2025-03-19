import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    if (username === "test" && password === "123") {
      navigate("/checkout");
      return;
    }
    // event.preventDefault();
    // await login(username, password);
    // console.log(username, password);
    // navigate("/checkout");
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="mt-5">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <button type="submit" className="btn btn-primary">
          Login
        </button> */}
        <button onClick={() => navigate("/checkout")}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
