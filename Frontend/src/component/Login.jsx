import React, { useState  } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [response , setres] = useState();
  const navigate = useNavigate();
  
  const formsubmission = () => {
    fetch("http://localhost:4000/login", {
      method: "post",
      headers:{
        "Content-Type": "application/json",
      },
      body : JSON.stringify({email,password}),
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        // data.email == email && data.password == password 
        if(true ) {
          navigate("/dashboard");
        }
      })
    })

    console.log("Email is =" + email);
    console.log("Password is = " + password);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Page clicked");
    formsubmission();
  };
  return (
    <div className='d-flex justify-content-center mt-5'>
      <Card style={{width:'50vh',border:'none'}}>
        <h2>Login</h2>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(value) => {
                console.log(value.target.value);
                setEmail(value.target.value);
              }} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={(value) => {
                console.log(value.target.value);
                setPassword(value.target.value);
              }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div>
        <span>Don't have a account <Link to="/Signup"> Register</Link></span>
        </div>
      <Button variant="primary" onClick={handleSubmit} type="submit">
        Submit
      </Button>
    </Form>  </Card>
    </div>
  )
}
