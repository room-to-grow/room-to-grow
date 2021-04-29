import React, { useEffect, useState } from 'react';

import UserPage from './UserMenu'

const App = () => {
  // the collection of all of the states
  const [loginName, setLoginName] = useState(null);
  const [registrationState, setRegistrationState] = useState(false);
  const [info, setInfo] = useState(null);

  /** NOT NEEDED/ SECURITY FLAW TO STORE USER PASSWORD IN STATE **/
  /** REQUEST SHOULD BE SENT DIRECTLY WITH USERNAME/PASSWORD ON SUBMIT **/
  // const [userName, setUsername] = useState();
  // const [password, setPassword] = useState();
  // const [newUsername, setNewusername] = useState();
  // const [newPswd, setNewpswd] = useState();

  function onUserLogin() {

    const nameInput = document.getElementById('userName');
    const pswdInput = document.getElementById('password');
    const username = nameInput.value;
    const password = pswdInput.value;
    
    if (username==='') return setInfo('Username field empty!')
    if (password==='') return setInfo('You must type in your password!')

    const user = JSON.stringify({ username: username, password: password });
    
    console.log('about to login', user)

    fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: user
    })
    .then(response => response.json())
    .then(data => {
      console.log
      if (data.message === "usernameNoMatch") {
        setInfo('Not an existing user!')
      } else if (data.message === "passwordNoMatch") {
        pswdInput.value = '';
        setInfo('Wrong password!')
      } else if (data.ssid) {
        setInfo(<div className="greenText">Logged in!</div>);
        setTimeout(() => setLoginName(ssid), 1500);
      }
    })
    .catch((error) => {
      console.error('Error when POST-fetching for login: ', error);
    })
  }


  function onUserRegistration() {
    const newUsername = document.getElementById('newUsername');
    const newPswd = document.getElementById('newPswd');
    const newPswdconfirm = document.getElementById('newPswdconfirm');
    const newUserval = newUsername.value;
    const newPswdval = newPswd.value;
    const newPswdconfval = newPswdconfirm.value

    if (newUserval==='') return setInfo('Username field empty!')
    if (newPswdval==='') return setInfo('You must type in a password!')
    if (newPswdconfval==='') return setInfo('Please confirm your password!')
    if (newPswdval!==newPswdconfval) {
      newPswd.value = '';
      newPswdconfirm.value = '';
      setInfo('Passwords don\'t match!')
      return;
    }
    const newUser = JSON.stringify({ username: newUserval, password: newPswdval })

    fetch('/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: newUser
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.message === "usernameInUse") {
        newUsername.value = '';
        setInfo('Username already exists!')
      } else if (data.message === "successful") {
        setInfo(<div className="greenText">Account created!</div>);
        setInfo(null);
        setTimeout(() => setRegistrationState(false), 1500);
      }
    })
    .catch((error) => {
      console.error('Error when POST-fetching for signup: ', error);
    })
    
  }

  // until loginName value is delcared (default of null), show the login page
  // sets the loginName (w/o password) to send to backend
  // to associate a user's favorites with their login name

  if (registrationState === true) {

    return (
      //registration page

      <div id="loginForm">

        <input className="fav-input"
          type="text"
          id="newUsername"
          placeholder="New username here"
        ></input>

        <input className="fav-input"
          type="password"
          id="newPswd"
          placeholder="New password here"
        ></input>

        <input className="fav-input"
          type="password"
          id="newPswdconfirm"
          placeholder="Confirm password here"
        ></input>

        <button className="fav-button"
          onClick={onUserRegistration}
        >Create Account</button>

        <div>{info}</div>

      </div>

    )

  }

  if (!loginName) {
   return(
     // this is where the login will go
     <div id="loginForm">
       {/* <label for="userName">Input User Name:</label> */}
       <input className="fav-input"
         type="text"
         id="userName"
         placeholder="Input username here"
       ></input>

        <input className="fav-input"
         type="password"
         id="password"
         placeholder="Input password here"
       ></input>

       <button className="fav-button"
          onClick={onUserLogin}
        >Login</button>

        <button className="fav-button"
          onClick={() => setRegistrationState(true)}
        >Register</button>

        <div>{info}</div>

      </div>
    )
  }

  return (
    <div id="outer-container">
      <UserPage loginName={loginName} logout={setLoginName} />
    </div>
  );
};

export default App;