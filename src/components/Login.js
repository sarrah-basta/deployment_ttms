import React from 'react';
import Link from '@material-ui/core/Link';
import InputField from './InputField';
import axios from 'axios';
import './Login.css';
import { useHistory } from "react-router-dom";


export default function Login() {

  const inputRefs = React.useRef([
    React.createRef(), React.createRef()
  ]);

  const [data, setData] = React.useState({});

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }))
  }
  var history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();

    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      const valid = inputRefs.current[i].current.validate()
      if (!valid) {
        isValid = false
      }
    }

    if (!isValid) {
      return
    }

    const values = {
      password: data.password,
      email: data.email
    }

    axios
      .post('http://127.0.0.0:port/login', values)
      .then((res) => {
        if (res.data.code === 200) {
          alert('Logged in succesfully');

          window.localStorage.setItem('userName', res.data.name);
          window.localStorage.setItem('role', res.data.role);
          history.push('/home');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });

  }

  return (
    <div className="login">
      <h1>VJTI TIME TABLE MANAGEMENT SYSTEM</h1>
      <form onSubmit={submitForm} className="form">
        <h1>Login</h1>
        <InputField
          ref={inputRefs.current[0]}
          name="email"
          label="Email*:"
          onChange={handleChange}
          validation={"required|email"}
        />
        <InputField
          ref={inputRefs.current[1]}
          name="password"
          type="password"
          label="Password*:"
          validation="required|min:6"
          onChange={handleChange}
        />
        <button className="submit_button">Login</button>
        <Link href="/register" variant="body2">Need an account? Sign up</Link>
      </form>
    </div>
  );
}