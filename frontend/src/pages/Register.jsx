import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-page">

      <div className="register-box">

        <h1>Create Account</h1>

        <p>Start your AI career journey</p>

        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p className="login-text">
  Already have an account?{" "}
  <Link to="/login">Login</Link>
</p>

      </div>

    </div>
  );
}

export default Register;