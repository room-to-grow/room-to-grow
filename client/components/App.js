import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import UserPage from './UserMenu'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';
import Favorites from './Favorites';

const App = () => {
  // the collection of all of the states
  const [gState, setGState] = useState({name : null, slug : null});
  const [family, setFamily] = useState(null);
  const [plant, setPlant] = useState(null);
  const [plantDetails, setPlantDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loginName, setLoginName] = useState(null);

  // This should only run once -- when the loginname is input
  // then fetch for the US State data and will then render the USMap
  

  // until loginName value is delcared (default of null), show the login page
  // sets the loginName (w/o password) to send to backend
  // to associate a user's favorites with their login name
  if (!loginName) {
   return(
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
          value="Submit"
          onClick={() => {
            let val = document.getElementById("userName");
            console.log(val.value);
            //val =  val.value 
            // how to get the data from the input text field to assign to the user state??
            setLoginName(val.value);
          }}
        ></input>
      </form>
    )
  }
 
  return (
    <div id="outer-container"> 
        <UserPage family={family} 
        setGState={setGState} 
        setFamily={setFamily} 
        setPlant={setPlant} 
        plant={plant} 
        gState={gState} 
        plantDetails={plantDetails} 
        setPlantDetails={setPlantDetails} 
        setFavorites={setFavorites} 
        favorites={favorites} 
        loginName={loginName} 
        logout={setLoginName}/>
    </div>
  );
};

export default App;