import React, { useEffect, useState } from 'react';

import UserPage from './UserMenu'

const App = () => {
  // the collection of all of the states
  const [loginName, setLoginName] = useState(null);
  const [zip, setZip] = useState('');
  const [registrationState, setRegistrationState] = useState(false);

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

    //fix routing later
    //route so that unless input matches user info in database,
    //reroute to login page, indefinitely
    //
    // fetch('/user') 

  }


  function onUserRegistration() {
    const newUser = document.getElementById('newUsername');
    const newPswd = document.getElementById('newPswd');
    const newPswdconfirm = document.getElementById('newPswdconfirm');

    const newUserval = newUser.value;
    const newPswdval = newPswd.value;

    /////////// WORK IN PROGRESS

    // fetch('/users') //POST
    //                 //query for SELECT users.username.*
    //                 //req.body.json()
    //                 //send users.username in array form
    //                 //if (newPswd.value === newPswdconfirm.value &&)
    // .then(response => {
    //   if (response.message === "username already exists") {
    //     newUser.value = '';
    //   } else if (response.message === "confirm password incorrect")  {
    //     newPswd.value = '';
    //   } else if (response.message === "username and password fields reset") {
    //     newUser.value = '';
    //     newPswd.value = '';
    //   } else if (response.message === "registration successful") {
    //     setRegistrationState(false);
    //   }

    //   })


  }

  // until loginName value is delcared (default of null), show the login page
  // sets the loginName (w/o password) to send to backend
  // to associate a user's favorites with their login name

  // if (registrationState === true) {

  //   return (
  //     //registration page

  //     <form id="loginForm">

  //       <input className="fav-input"
  //         type="text"
  //         id="newUsername"
  //         placeholder="New username here"
  //       ></input><br />

  //       <input className="fav-input"
  //         type="password"
  //         id="newPswd"
  //         placeholder="New password here"
  //       ></input><br />

  //       <input className="fav-input"
  //         type="password"
  //         id="newPswdconfirm"
  //         placeholder="Confirm password here"
  //       ></input><br />

  //       <input className="fav-button"
  //         type="submit"
  //         value="Create Account"
  //         onClick={onUserRegistration}
  //       ></input>

  //     </form>

  //   )

  // }

  if (!loginName) {
   return(
     // this is where the login will go
     <div id="loginForm">
       {/* <label for="userName">Input User Name:</label> */}
       <input className="fav-input"
         type="text"
         id="userName"
         placeholder="Input username here"
       ></input><br></br>

        <input className="fav-input"
         type="password"
         id="password"
         placeholder="Input password here"
       ></input><br/>

       <input className="fav-button"
         type="submit"
          value="Submit"
          onClick={onUserLogin}
        ></input>

        <input className="register-button"
          type="submit"
          value="Register"
          onClick={() => setRegistrationState(true)}
        ></input>

      </div>
    )
  }

  // If there is no statesData yet, show a loading indicator.
  if (!statesData) {
    return (
      <div>Loading...</div>
    );
  }


  return (
    <div id="outer-container">
        <UserPage loginName={loginName} logout={setLoginName}/>
    </div>
  );
};

export default App;