import React from 'react';

const USMap = (props) => {
  const { statesData } = props;
  const { setGState } = props;
  const { setFamily } = props;
  const { setPlant } = props;

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
          onClick={
            () => {
              console.log(`${stateData.name} clicked`);
              setGState(stateData.name);
              setFamily(null);
              setPlant(null);
            }
          }
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