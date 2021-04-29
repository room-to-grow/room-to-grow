import React, { useEffect, useState } from 'react';
import FamilyList from './FamilyList';
import USMap from './USMap';

const PlantDetails = props => {
  const { gState, setGState } = props;
  const { family } = props;
  const { plant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;
  const { favorites, setFavorites } = props;
  const { loginName } = props;
  // const { familiesData, setFamiliesData } = props; 

function revertDetailStates () {
  setPlantDetails(null);
}


  useEffect(
    () => {
      if (gState.name === null || family === null || plant === null) return;
      console.log(plant);
      console.log(gState.slug)
      console.log(family)
      console.log(plant.scientific_name)
      fetch(`/location/${gState.slug}/${family}/${plant.scientific_name}`)
        .then(response => response.json())
        .then(data => {
          console.log("plant details data: ", data)
          setPlantDetails(data);
        })
        .catch(() => console.log('oops'));
    },
    [plant]
    // FOR TESTING W/O BACKEND ONLY
    // () => {
    //   const obj = {
    //     detail1: 'green plant',
    //     detail2: 'edible'
    //   };
    //   setPlantDetails(obj);
    //   console.log('plantDeets', plantDetails);
    // }, 
    // [plant]
  );

  if (plantDetails === null) return (<div></div>) 
  else return (
    <div className='popup-box'>
        <div className='plantDetails-box'>
          <span className='close-icon' onClick={() => {revertDetailStates()}}>x</span>
            <div id="detailsContainer">
              <ul id="detailsList">
                <img className="detail-img" src={`${plantDetails.image_url}`}></img>
                <li className="details-element">
                  <span className="details-field">Name:</span> {plantDetails.common_name}
              
                </li>
                <li className="details-element">
                <span className="details-field">Scientific Name:</span> {plantDetails.scientific_name}
                </li>
                <li className="details-element">
                <span className="details-field">Edible:</span> {`${plantDetails.edible}`}
                </li>
                <li className="details-element">
                <span className="details-field">Average Height:</span> {plantDetails.average_height}
                </li>
                <li className="details-element">
                <span className="details-field">Growth Habit:</span> {plantDetails.growth_habit}
                </li>
                <li className="details-element">
                <span className="details-field">Growth Rate:</span> {plantDetails.growth_rate}
                </li>
                <li>
                  <form onSubmit = {(e) => {
                        e.preventDefault();
                        console.log("this is login name ", loginName)
                        const bodyData = { 
                          plants : plantDetails,
                          user_id : loginName,
                          plant_id : plantDetails.scientific_name,
                          notes : ' '}; 
                          console.log(bodyData)
              
                        console.log('in try block')
                        fetch('/signup/faves', {
                        // method
                        method: 'POST',
                        // headers
                        headers: {
                          'Content-Type': 'application/json'
                        },
                    
                        // body
                        body: JSON.stringify(bodyData)
                      }
                      ).then(result => result.json())
                        .then(data => {
                          const notes = document.getElementById('notes-input');
                          console.log('in the date:', data);
                          setFavorites(data);
                          revertDetailStates ()
                        })
                      .catch(e => console.log('in the catch', e.stack))           
                      console.log('posting to db...');    
                  }}>
                    <input id = 'notes-input' className = "fav-input" type="text" name="notes" placeholder="Write notes here"></input>
                    <button className = "fav-button" type="submit" 
                  > Add to Favorites</button>
                </form>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
    
  );
}

/**
 * common_name: data.common_name,
    scientific_name: data.scientific_name,
    family_common_name: data.family_common_name,
    edible: data.edible,
    vegetable: data.vegetable,
    image_url: data.image_url,
    toxicity: data.specifications.toxicity,
    growth_habit: data.specifications.growth_habit,
    growth_form: data.specifications.growth_form,
    growth_rate: data.specifications.growth_rate,
    shape_and_orientation: data.specifications.shape_and_orientation,
    average_height: data.specifications.average_height.cm
 */
/*
    onClick = {(e) => {
        
      // this response is from the database
        // server gets body
        // models.favorites.create(req.body)
          //res.locals.favorites = models.favorites.find({})
        // res.send(res.locals.favorites)
      
      // response
    //  const response =  fetch(`/db`, {
    //     // method
    //     method: 'POST',
    //     // headers
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    
    //     // body
    //     body: { plants : plantDetails,
    //             user_id : loginName,
    //             plant_id : plantDetials.scientific_name,
    //             notes : ' '}
    //   }
    //   )
      //const notes = document.getElementById('fav-input')
      
      
    }
    // setFavorites({response.json())
    }
    */
export default PlantDetails;