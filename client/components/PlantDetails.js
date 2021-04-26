import React, { useEffect, useState } from 'react';

const PlantDetails = props => {
  const [plantDetails, setPlantDetails] = useState(null);

  const { gState } = props;
  const { family } = props;
  const { plant } = props;
  // const { plantDetails } = props;
  // const { setPlantDetails } = props;

  useEffect(
    // () => {
    //   fetch(`/${gState}/${family}/${plant}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       setPlantDetails(data);
    //     })
    //     .catch(() => console.log('oops'));
    // },

    // FOR TESTING W/O BACKEND ONLY
    () => {
      const obj = {
        detail1: 'green plant',
        detail2: 'edible'
      };
      setPlantDetails(obj);
      console.log('plantDeets', plantDetails);
    }, 
    [plant]
  )

  if (plant === null) return (<div></div>)

  else return (
    <ul id="detailsList">
      <li>
        {`detail1: ${plantDetails.detail1}`}
      </li>
      <li>
        {`detail2: ${plantDetails.detail2}`}
      </li>
    </ul>
  );
}


export default PlantDetails;