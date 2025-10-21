import { useEffect, useState } from "react";
import "./Login.css";
import { FaUserAlt, FaKey } from "react-icons/fa";

function Login() {
  //Login Logic.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //Handling the change event.
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const loginBtn = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        // Redirect to dashboard or another page
        window.location.href = "/";
      } else {
        alert(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="login-cont">
        <div className="login-header">
          <img src="/teqrox_logo.png" alt="Logo" />
          <h1>Login Page</h1>
        </div>
        <div className="form-cont">
          <div className="login-form">
            <div className="fields">
              <label htmlFor="username">
                <FaUserAlt style={{ marginRight: "10px" }}></FaUserAlt>Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="fields">
              <label htmlFor="password">
                <FaKey style={{ marginRight: "10px" }}></FaKey>Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button type="submit" onClick={loginBtn}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
