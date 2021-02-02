import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from 'axios'


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/api-token-auth/',{
        username: username,
        password: password
    })
    .then(res =>{
        console.log(res.data)
        const tokenauth = res.data.token
        localStorage.setItem('Token', tokenauth)
        
    })
  }

  return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    autoFocus
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </Button>
            </Form>
        </div>
  );
}