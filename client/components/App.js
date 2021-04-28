import React, { useEffect, useState } from 'react';

import UserPage from './UserMenu'

const App = () => {
  // the collection of all of the states
  const [loginName, setLoginName] = useState(null);
  const [zip, setZip] = useState('');
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

    nameInput.value = '';
    pswdInput.value = '';

    console.log(username, password);
    setLoginName(username);

    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: newUser
    }) //POST
                    //query for SELECT users.username.*
                    //req.body.json()
                    //send users.username in array form
                    //if (newPswd.value === newPswdconfirm.value &&)
    .then(response => response.json())
    .then(data => {
      if (data.message === "usernameInUse") {
        newUser.value = '';
        setInfo('Username already exists!')
      } 
      else if (data.message === "successful") {
        setInfo(<div className="greenText">Account created!</div>);
        setTimeout(() => setRegistrationState(false), 3000);
      }
    })
    .catch((error) => {
      console.error('Error when POST-fetching for signup: ', error);
    })
  }


  function onUserRegistration() {
    const newUsername = document.getElementById('newUsername');
    const newPswd = document.getElementById('newPswd');
    const newPswdconfirm = document.getElementById('newPswdconfirm');

    const newUserval = newUsername.value;
    const newPswdval = newPswd.value;
    const newPswdconfval = newPswdconfirm.value
    if (newPswdval!==newPswdconfval) {
      newPswd.value = '';
      newPswdconfirm.value = '';
      setInfo('Passwords don\'t match!')
      return;
    }
    const newUser = { username: newUserval, password: newPswdval }

    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    }) //POST
                    //query for SELECT users.username.*
                    //req.body.json()
                    //send users.username in array form
                    //if (newPswd.value === newPswdconfirm.value &&)
    .then(response => response.json())

    .then(data => {
      if (data.message === "usernameInUse") {
        newUsername.value = '';
        setInfo('Username already exists!')
      } else if (data.message === "successful") {
        setInfo(<div className="greenText">Account created!</div>);
        setTimeout(() => setRegistrationState(false), 3000);
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

      </div>
    )
  }

  return (
    <div id="outer-container">
        <UserPage loginName={loginName} logout={setLoginName}/>
    </div>
  );
};

export default App;