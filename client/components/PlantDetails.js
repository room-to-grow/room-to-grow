import React, { useEffect } from 'react';
// import { getPlantDetails } from '../../helpers';
import helpers from '../../helpers';
// import Button from "@material-ui/core/Grid";


const PlantDetails = props => {

  const { family } = props;
  const { plant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;
  const { gState } = props;

  useEffect(
    // () => {
    //   fetch(`/${gState}/${family}/${plant}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       setPlantDetails(data);
    //     })
    //     .catch(() => console.log('oops'));
    // },
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
    <ul>
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