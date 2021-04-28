import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import FamilyList from './FamilyList'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';
import Favorites from './Favorites';
import SearchContainer from './SearchContainer';

const App = () => {
  // the collection of all of the states
  const [statesData, setStatesData] = useState(null);
  const [gState, setGState] = useState({ name: null, slug: null });
  const [family, setFamily] = useState(null);
  const [plant, setPlant] = useState(null);
  const [plantDetails, setPlantDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loginName, setLoginName] = useState(null);
  const [zip, setZip] = useState('');
  const [registrationState, setRegistrationState] = useState(false);
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [newUsername, setNewusername] = useState();
  const [newPswd, setNewpswd] = useState();

  // This should only run once -- when the loginname is input
  // then fetch for the US State data and will then render the USMap
  useEffect(() => {
    (async () => {
      const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
      const statesData = await res.json();
      // Set the statesData with the data received from fetch().
      setStatesData(statesData);
    })();
  }, [loginName]);


  function onUserLogin() {
    // () => {
    //   let val = document.getElementById("userName");
    //   console.log(val.value);
    //   //val =  val.value 
    //   // how to get the data from the input text field to assign to the user state??
    //   setLoginName(val.value);
    // } [ akldfjdaklsf  ] => { value: fdsahfhadkf, }

    const nameInput = document.getElementById('userName');
    const pswdInput = document.getElementById('password');

    const username = nameInput.value;
    const password = pswdInput.value;

    //

    nameInput.value = '';
    pswdInput.value = '';

    console.log(username, password);

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
  //cross reference






  //can INSERT if user doesnt already exist
  //or can do two fetch requests
  //request the user.body.usernames to make sure username doesn't already exist



  // until loginName value is delcared (default of null), show the login page
  // sets the loginName (w/o password) to send to backend
  // to associate a user's favorites with their login name

  if (registrationState === true) {

    return (
      //registration page

      <form id="loginForm">

        <input className="fav-input"
          type="text"
          id="newUsername"
          placeholder="New username here"
        ></input><br />

        <input className="fav-input"
          type="password"
          id="newPswd"
          placeholder="New password here"
        ></input><br />

        <input className="fav-input"
          type="password"
          id="newPswdconfirm"
          placeholder="Confirm password here"
        ></input><br />

        <input className="fav-button"
          type="submit"
          value="Create Account"
          onClick={onUserRegistration}
        ></input>

      </form>

    )

  }

  if (!loginName) {
<<<<<<< HEAD
    return (
      // this is where the login will go
      <form id="loginForm">
        {/* <label for="userName">Input User Name:</label> */}
        <input className="fav-input"
          type="text"
          id="userName"
          name="userName"
          placeholder="Input username here"
        ></input>
        <input className="fav-button"
          type="submit"
=======
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
>>>>>>> main
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

<<<<<<< HEAD
=======


>>>>>>> main
  // If there is no statesData yet, show a loading indicator.
  if (!statesData) {
    return (
      <div>Loading...</div>
    );
  }

  return (

    <div id="outer-container">

      <div id="info-container">
        <SearchContainer
          zip={zip}
          setZip={setZip}
          gState={gState}
          setGState={setGState}
        />
        <USMap
          id="us-map"
          statesData={statesData}
          setGState={setGState}
          setFamily={setFamily}
          setPlant={setPlant}
          setPlantDetails={setPlantDetails}
        />
        <div id="listsContainer">
          <FamilyList
            gState={gState}
            setGState={setGState}
            setFamily={setFamily}
            setPlant={setPlant}
            setPlantDetails={setPlantDetails}

          />
          <PlantList
            family={family}
            gState={gState}
            setPlant={setPlant}
            setPlantDetails={setPlantDetails}
          />
          <PlantDetails
            family={family}
            plant={plant}
            gState={gState}
            plantDetails={plantDetails}
            setPlantDetails={setPlantDetails}
            setFavorites={setFavorites}
            favorites={favorites}
            loginName={loginName}
          />
        </div>
      </div>

      <div id="favorites-container">
        <Favorites
          favorites={favorites}
        // loginName={loginName}
        />
      </div>
    </div>
  );
};

export default App;