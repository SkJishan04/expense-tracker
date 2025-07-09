import { useState } from "react";
import axios from "axios";

function Register({ onAuth, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      onAuth(res.data.token);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.response?.status === 409
          ? "Username already taken."
          : "Registration failed.");
      setFormError(message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Register</h2>
      {formError && <p className="error-text">{formError}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>

      <p className="switch-link">
        Already have an account?
        <button type="button" onClick={switchToLogin}> Login</button>
      </p>
    </form>
  );
}

export default Register;
