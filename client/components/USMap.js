import React from 'react';

const USMap = (props) => {
  const { statesData } = props;
  const { setGState } = props;
  const { setFamily } = props;
  const { setPlant } = props;
  const { setPlantDetails } = props;

  return (
    <svg id="map-svg" viewBox="0 0 960 600" width="95%">
      {statesData.map((stateData, index) =>
        <path
          className="renderedMap"
          style={{cursor: "pointer", fill: "#373737"}}
          key={index}
          stroke="#5DBB63"
          strokeWidth="3px"
          d={stateData.shape}
          onMouseOver={(event) => {
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
            event.target.style.fill = '#373737';
          }}
        >
        </path>
      )}
    </svg>
  )
}

export default USMap