/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React from 'react';

const USMap = (props) => {
  const { statesData } = props;
  const { gState } = props;
  const { setGState } = props;
  const { setFamily } = props;
  const { setPlant } = props;
  const { setPlantDetails } = props;

  return (
    <svg id="map-svg" viewBox="0 0 960 600" width="95%">
      {statesData.map((stateData, index) => (
        <path
          stateIdNum={index}
          className="renderedMap"
          style={{ cursor: 'pointer', fill: '#373737' }}
          key={index}
          stroke="#5DBB63"
          id={stateData.name}
          strokeWidth="3px"
          d={stateData.shape}
          onMouseOver={(event) => {
            console.log(event.target);
            event.target.style.fill = '#7dc882';
          }}
          onClick={
            () => {
              console.log(`${stateData.name} clicked`);
              setGState({ name: stateData.name, slug: null });
              setFamily(null);
              setPlant(null);
              setPlantDetails(null);
            }
          }
          onMouseOut={(event) => {
            if (gState.name !== stateData.name) {
              event.target.style.fill = '#373737';
            }
          }}
        />
      ))}
    </svg>
  );
};

export default USMap;
