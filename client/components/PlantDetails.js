import React from 'react';
import { getPlantDetails } from '../../helpers';

const PlantDetails = props => {

  const { selectedPlant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;

  setPlantDetails(getPlantDetails(selectedPlant));

  // this is wrong- have to render nothing at first
  // and then only update every time the selectedPlant is reset
  // and re-render every time the selectedPlant changes
  // is this an effect????

  return (
    <ul>
      <li>
        {plantDetails.detail1};
      </li>
      <li>
        {plantDetails.detail2};
      </li>
    </ul>
  )
}


export default PlantDetails;