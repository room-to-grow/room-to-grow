import React, { useEffect, useState } from 'react';

const PlantDetails = props => {
  // const [plantDetails, setPlantDetails] = useState(null);

  const { gState } = props;
  const { family } = props;
  const { plant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;

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
    <div id="detailsContainer">
      <ul id="detailsList">
        <li>
          {`Name: ${plantDetails.common_name}`}
       
        </li>
        <li>
          {`edible: ${plantDetails.edible}`}
        </li>
        <li>
          <form>
            <input type="text" name="notes"></input>
            <input type="submit" onClick = {() => {
              console.log('posting to db...');
              fetch(`/db`, {
                // method
                method: 'POST',
                // headers
                headers: {
                  'Content-Type': 'application/json'
                },
            
                // body
                body: {plantDetails}
              }
              )
            }}
          value="Favorite" ></input>
        </form>
        </li>
      </ul>
      
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
export default PlantDetails;