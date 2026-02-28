import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/form.css';
import logo from "../assets/logoU.jpg";
import type { AuthDto } from "../dto/AuthDto";
import { AuthLogin } from "../api_gateway/auth_api";


const Form: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassWord] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: AuthDto = { email, password };

    try {
      const data = await AuthLogin(payload);
      console.log("Login success:", data);
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="img-container">
          <img src={logo} alt="Image-logo" />
        </div>

        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <div className="social-container">
          <div className="social">
            <Link to={""}><i className="fab fa-facebook-f"></i></Link>
            <Link to={""}><i className="fab fa-google"></i></Link>
            <Link to={""}><i className="fab fa-instagram"></i></Link>
            <Link to={""}><i className="fab fa-twitter"></i></Link>
            <Link to={""}><i className="fab fa-linkedin-in"></i></Link>
          </div>
          <div className="forget-password">
            <Link to={""}><h4>forget password</h4></Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;