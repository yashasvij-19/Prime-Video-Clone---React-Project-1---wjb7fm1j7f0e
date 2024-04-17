import React, { useState } from "react";
import "../styles/Login.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const Login = () => {
  const { setLoggedMail } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { name, email, password, rePassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match");
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "f104bi07c490",
          },
          body: JSON.stringify({
            email,
            password,
            appType: "ott",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(email, JSON.stringify(data));
        setLoggedMail(email);
        navigate("/movies");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        console.error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  return (
    <div className="login">
      <div className="theLogo">
        <img
          src="https://m.media-amazon.com/images/G/01/digital/video/avod/AV_Logo_150._CB430404026_.png"
          alt="prime-video-logo"
        />
      </div>
      <div className="theBoxLog">
        <span className="theBoxerror">{error}</span>
        <h3>Sign in</h3>
        <label htmlfor="emailInput">Enter your email address</label>
        <br />
        <input
          type="email"
          className="emailInput"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label htmlfor="pass">Password</label>
        <br />
        <input
          type="password"
          className="pass"
          placeholder="At least 6 characters"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <br />
        <label htmlfor="passRe">Re-enter password</label>
        <br />
        <input
          type="password"
          className="passRe"
          name="rePassword"
          value={rePassword}
          onChange={handleChange}
        />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Continue
        </Button>
        <p>
          By continuing, you agree to the Amazon{" "}
          <a
            href="https://www.primevideo.com/help/ref=av_auth_te?nodeId=202064890"
            target="_blank"
            id="condition"
          >
            Conditions of Use and Privacy Notice.
          </a>
        </p>
      </div>
      <div className="theFoot">
        <a
          href="https://www.primevideo.com/help/ref=av_auth_ter?nodeId=202064890"
          target="_blank"
        >
          Terms and Privacy Notice
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./Login.js" target="_blank">
          Send us feedback
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://www.primevideo.com/help/ref=av_auth_hp"
          target="_blank"
        >
          Help
        </a>
        <br />
        <br />
        <span>© 1996-2023, Amazon.com, Inc. or its affiliates</span>
      </div>
    </div>
  );
};

export default Login;
