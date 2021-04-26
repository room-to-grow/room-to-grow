import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import FamilyList from './FamilyList'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';
import Favorites from './Favorites';

const App = () => {
  // the collection of all of the states
  const [statesData, setStatesData] = useState(null);
  const [gState, setGState] = useState({name : null, slug : null});
  const [family, setFamily] = useState(null);
  const [plant, setPlant] = useState(null);
  const [plantDetails, setPlantDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loginName, setLoginName] = useState(null);

  // This should only run once due to the [] arg for the dependencies.
  useEffect(() => {
    (async () => {
      const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
      const statesData = await res.json();
      // Set the statesData with the data received from fetch().
      setStatesData(statesData);
    })();
  }, [loginName]);

  
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
 

  // If there is no statesData yet, show a loading indicator.
 if (!statesData) {
    return (
      <div>Loading...</div>
    );
  }

  return (

    <div id="outer-container">
      <div id = "info-container"> 
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

      <div id = "favorites-container"> 
        <Favorites 
          favorites={favorites} 
          // loginName={loginName}
        />
      </div>
    </div>
  );
};

export default App;