import React, { useState } from 'react';
import helpers from '../../helpers';
// import { useBetween } from 'use-between';

const USMap = (props) => {
  const { statesData } = props;
  const { setSelectedGeoState } = props;
  const { setFamiliesData } = props;
  const { setSelectedFamily } = props;
  const { setSelectedPlant } = props;

  // const {render}
  // this is where the new state has to go
  // then can pass down to listscotnainer and down from there
  
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
          onClick={() => {
            // when a state is clicked,
            // set the selected geoState
            // and null out family and plant
            setSelectedGeoState(stateData.name);
            fetch(`/location/${stateData.name}`)
              .then(response => response.json())
              .then(data => {
                setFamiliesData(data);
                setSelectedFamily(null);
                setSelectedPlant(null);
                // setSelectedGeoState(stateData.name)
              });  
          }}
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