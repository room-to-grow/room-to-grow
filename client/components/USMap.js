import React, { useState } from 'react';

const getPlantFamilies = (stateName) => {
  //console.log("STATE :", stateName)
    fetch(`/location/${stateName}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

const USMap = (props) => {
  const { statesData } = props;
  const { setFamiliesData } = props;

  return (
    <svg id="map-svg" viewBox="0 0 960 600" width="60%">
      {statesData.map((stateData, index) =>
        <path
          className="someCSSClass"
          style={{cursor: "pointer", fill: "#373737"}}
          key={index}
          stroke="#5DBB63"
          strokeWidth="3px"
          d={stateData.shape}
          onMouseOver={(event) => {
            event.target.style.fill = '#7dc882';
          }}
          // onClick={() => getPlantFamilies(stateData.name)}
          onClick={() => {
            fetch(`/location/${stateData.name}`)
              .then(response => response.json())
              .then(data => setFamiliesData(data));
          }}
          onMouseOut={(event) => {
            event.target.style.fill = '#373737';
          }}
        >
        </path>
      )}
    </svg>
  )
}


export default USMap