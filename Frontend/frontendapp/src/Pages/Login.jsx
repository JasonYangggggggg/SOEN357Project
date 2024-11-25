import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log("Registering user:", username, password, role);
      const response = await axios.post(
        "http://localhost:3001/register",
        { username, password, role },
        { withCredentials: true }
      );
    } else {
      console.log("Logging in user:", username, password);
      const response = await axios.post(
        "http://localhost:3001/Login",
        { username, password },
        { withCredentials: true }
      );
      if (response.data.message === "login success") {
        navigate("/");
      } else {
        console.log("Invalid login");
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
            {isRegistering ? "Register" : "Login"}
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="username"
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  textAlign: "left",
                  color: "#555",
                }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: "14px",
                  marginBottom: "5px",
                  textAlign: "left",
                  color: "#555",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            {isRegistering && (
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="role"
                  style={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    textAlign: "left",
                    color: "#555",
                  }}
                >
                  Select Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "100%",
                  }}
                  required
                >
                  <option value="user">Normal User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>
          <p style={{ fontSize: "14px", color: "#555", marginTop: "15px" }}>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              onClick={toggleMode}
              style={{
                color: "#007BFF",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isRegistering ? " Login" : " Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
