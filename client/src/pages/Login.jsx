import { useState } from "react";

function Login({ onAuth, switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(""); // Reset error on submit
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onAuth(data.token);
      } else {
        setFormError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setFormError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
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
      <button type="submit">Login</button>

      <p className="switch-link">
        Don’t have an account?
        <button type="button" onClick={switchToRegister}> Register</button>
      </p>
    </form>
  );
}

export default Login;
