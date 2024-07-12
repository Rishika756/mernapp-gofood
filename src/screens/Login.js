import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login request:", credentials); // Log the credentials being sent
      
      const response = await fetch("http://localhost:5001/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      console.log("Server responded with:", response); // Log the entire response object
      
      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const json = await response.json();
      console.log("Response JSON:", json); // Log the parsed JSON response from the server

      if (json.success) {
        alert("Login successful");
        navigate("/"); // Redirect to home page upon successful login
      } else {
        alert("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log in. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/createuser" className="btn btn-link">Create an account</Link>
      </form>
    </div>
  );
}
