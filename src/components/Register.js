import React from 'react';
import Link from '@material-ui/core/Link';
import InputField from './InputField';
import './Login.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';


export default function Register() {

  const inputRefs = React.useRef([
    React.createRef(), React.createRef(), React.createRef(), React.createRef()
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
      console.log(valid)
      if (!valid) {
        isValid = false
      }
    }

    if (!isValid) {
      return
    }

    const values = {
      password: data.password,
      email: data.email,
      fullname: data.fullname
    }

    axios
      .post('http://0.0.0.0:$PORT/register', values)
      .then((res) => {
        if (res.data.code === 200) {
          alert('Registered succesfully');
          history.push('/home');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });

    console.log("Logged In");
  }


  return (
    <div className="login">
      <h1>VJTI TIME TABLE MANAGEMENT SYSTEM</h1>
      <form onSubmit={submitForm} className="form">
        <h1>Register</h1>
        <InputField
          ref={inputRefs.current[0]}
          name="fullname"
          label="Full Name*:"
          onChange={handleChange}
          validation={"required"}
        />
        <InputField
          ref={inputRefs.current[1]}
          name="email"
          label="Email*:"
          onChange={handleChange}
          validation={"required|email"}
        />
        <InputField
          ref={inputRefs.current[2]}
          name="phonenumber"
          label="Phone Number*:"
          onChange={handleChange}
          validation={"required|phoneNumber"}
        />
        <InputField
          ref={inputRefs.current[3]}
          name="password"
          label="Password*:"
          validation="required|min:6"
          onChange={handleChange}
        />
        <button className="submit_button">Register</button>
        <Link href="/" variant="body2">Already have an account? Sign in</Link>
      </form>
    </div>
  );
}