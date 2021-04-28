// import React, { useState } from 'react';
import React, {useEffect, useState} from 'react';
//import { Button } from '@material-ui/core';
// import helpers from '../../helpers';
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';

const FamilyList = props => {
  const [familiesData, setFamiliesData] = useState(null);
//useState:
//const [default state, method that changes state] = useState(null)
  function revertStates() {
    setFamiliesData(null);
    setGState({ name: null, slug: null })
  }

  const { gState } = props;
  const { setGState } = props;
  const { family } = props;
  const { setFamily } = props;
  const { plant } = props;
  const { setPlant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;
  const { favorites } = props;
  const { loginName } = props;
 
  // families receives object
  // first k-v pair 
  // have to get the slug and pass back to backend with the family name
  // similalry with plants, will receive slug and family name
  useEffect(
    () => {
      if (gState.name === null) return;
      
      // console.log('fetching family list', gState.name);
      fetch(`/location/${gState.name}`)
        .then(response => response.json())
        .then(data => {
          // console.log('fetched data:', data);
          setFamiliesData(data.families);
          setGState({name : gState.name, slug : data.slug});
        })
        .catch(() => console.log('oops'))
    },
    [gState.name]
  );

  let plants;

  if(family === null) plants = <div></div>;

  else {
    console.log('in the else')
    plants = (
  <div className='plantListComponent'>
  <PlantList
  family={family}
  gState={gState}
  setPlant={setPlant}
  setPlantDetails={setPlantDetails}
  />
  </div>)
  }

  // let details;

  // if(plant === null) details = <div></div>;

  // else {
  //   details = (
  //     <div className='plantListComponent'>
  //     <PlantDetails
  //       family={family}
  //       plant={plant}
  //       gState={gState}
  //       plantDetails={plantDetails}
  //       setPlantDetails={setPlantDetails}
  //       setFavorites={setFavorites}
  //       favorites={favorites}
  //       loginName={loginName}
  //     />
  //     </div>
  //   )
  // }

  if (familiesData === null) return (<div></div>)
  else return (
    <div className='popup-box'>
        <div className='box'>
          <span className='close-icon' onClick={() => {revertStates()}}>x</span>
          
          <div className='familyList-plantList-container'>
          <h1>See Plants In {gState.name}:</h1>
            <ul id="familyList">
              <div className='familyList-dropdown'>
                <button className='familyList-dropbtn'>See Family List:</button>
                <div className='dropdown-content'>
                  {familiesData.map((family, index) => {
                    // console.log(family);                    
                    return (
                      <li key={index}>
                        <button
                          className = "list-buttons"
                          // color = "#5dbb63"
                          onClick={
                            () => {
                              setFamily(family);
                              setPlant(null);
                              setPlantDetails(null);
                            }
                          }
                        >
                          {family}
                        </button>
                      </li>
                    )          
                  })}
              </div>
              </div>
            </ul>
            {plants}
            {/* {details} */}
            </div>
          </div>
        </div>
  );
}

export default FamilyList;