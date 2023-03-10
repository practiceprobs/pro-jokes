'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, provider, db } from '../../firebase/firebase'


// Helper function to save a document in the users collection
async function saveFullName(uid, name) {
  try {
    const docRef = await setDoc(doc(db, "users", uid), { fullName: name });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function SignUp() {
  const router = useRouter();
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
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password fields don't match");
      return;
    }

    // Create new user with email and password
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in

        // Save the user document
        saveFullName(userCredential.user.uid, formData.fullName);

        // Clear any existing error messages
        setErrorMsg('');

        // Send email verification
        sendEmailVerification(userCredential.user)
          .then(() => {
            // Email verification sent!

            // Redirect to home page
            router.push('/');
          })
          .catch((error) => {

            // Update errorMsg
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {

        // Update errorMsg
        setErrorMsg(error.message);
      });
  }

  // Sign up with google
  function googleSignUpHandler() {

    // Validate that the user entered their name
    if (!formData.fullName) {
      setErrorMsg("Enter your full name");
      return;
    }

    signInWithPopup(auth, provider)
      .then((userCredential) => {

        // Save the user document
        saveFullName(userCredential.user.uid, formData.fullName);

        // Redirect to home page
        router.push('/');
      }).catch((error) => {

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

        {/* display error message if an error exists */ }
        { errorMsg && <p style={ { color: "red" } }>{ errorMsg }</p> }

        <button type="submit">Sign up</button>

      </form>

      <button onClick={ googleSignUpHandler }>Sign up with Google</button>

    </main>
  )
}
