import React, { useEffect } from 'react';

const PlantDetails = props => {

  // may not need gState and family for endpoints (check w/ backend)
  // if can simply retrieve plant details by plant name
  // if so, then don't need these first 2 props
  const { gState } = props;
  const { family } = props;
  const { plant } = props;
  const { plantDetails } = props;
  const { setPlantDetails } = props;

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