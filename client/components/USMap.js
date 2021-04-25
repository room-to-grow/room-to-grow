import React, { useState } from 'react';
import helpers from '../../helpers';

// const getPlantFamilies = (stateName) => {
//   //console.log("STATE :", stateName)
//     fetch(`/location/${stateName}`)
//         .then(response => response.json())
//         .then(data => console.log(data));
// }

const USMap = (props) => {
  const { statesData } = props;

  return (
    <svg viewBox="0 0 960 600">
      {statesData.map((stateData, index) =>
        <path
          className="renederedMap"
          style={{cursor: "pointer", fill: "springgreen"}}
          key={index}
          stroke="#fff"
          strokeWidth="6px"
          d={stateData.shape}
          onMouseOver={(event) => {
            event.target.style.fill = 'forestgreen';
          }}
          onClick={() => helpers.getPlantFamilies(stateData.name)}
          onMouseOut={(event) => {
            event.target.style.fill = 'springgreen';
          }}
        >
        </path>
      )}
    </svg>
  )
}


export default USMap