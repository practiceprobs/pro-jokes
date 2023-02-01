'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase'


export default function SignUp() {
  const [formData, setFormData] = useState({
    'fullName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  function onChangeHandler(event) {
    const key = event.target.name;
    const value = event.target.value;
    setFormData(prevFormData => (
      {
        ...prevFormData,
        [key]: value
      }
    ))
  }

  function onSubmitHandler(event) {
    console.log("=== onSubmitHandler() invoked ============");

    // Prevent page refresh
    event.preventDefault();

    // Validate password consistency
    if (formData.password !== formData.confirmPassword){
      setErrorMsg("Password fields don't match");
      return;
   }

    // Create new user
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in

        // Clear any existing error messages
        setErrorMsg('');

        // Grab the user
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        
        // Update errorMsg
        setErrorMsg(error.message);
      });
  }

  return (
    <main>
      <h1>Sign up</h1>

      <form
        id="signup_form"
        onSubmit={ onSubmitHandler }
      >

        <div>
          <label htmlFor="signup_full_name">Full Name</label>
          <input
            type="text"
            id="signup_full_name"
            name="fullName"
            required
            value={ formData.fullName }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_email">Email</label>
          <input
            type="email"
            id="signup_email"
            name="email"
            required
            value={ formData.email }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_password">Password</label>
          <input
            type="password"
            id="signup_password"
            name="password"
            required
            value={ formData.password }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_confirm_password">Confirm password</label>
          <input
            type="password"
            id="signup_confirm_password"
            name="confirmPassword"
            required
            value={ formData.confirmPassword }
            onChange={ onChangeHandler }
          />
        </div>

        {/* display error message if an error exists */}
        {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}

        <button type="submit">Sign up</button>

      </form>

      <button>Sign up with Google</button>

    </main>
  )
}
