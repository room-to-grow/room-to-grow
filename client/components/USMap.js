import React, { useEffect, useState } from 'react';

// Functional component for the SVG map. Take in the map JSON data as a prop and
// return SVG.
const USMap = (props) => {

  const { statesData } = props;

    // The statesData is null by default until we set it.
    const [statesData, setStatesData] = useState(null);

    // This should only run once due to the [] arg for the dependencies.
    useEffect(() => {
      (async () => {
        const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
        const statesData = await res.json();
        // Set the statesData with the data received from fetch().
        setStatesData(statesData);
      })();
    }, []);
  
    // If there is no statesData yet, show a loading indicator.
    if (!statesData) {
      return (
        <div>Loading...</div>
      );
    }

  return (
    <svg viewBox="0 0 960 600">
      {statesData.map((stateData, index) =>
        <path
          className="someCSSClass"
          style={{cursor: "pointer", fill: "springgreen"}}
          key={index}
          stroke="#fff"
          strokeWidth="6px"
          d={stateData.shape}
          onMouseOver={(event) => {
            event.target.style.fill = 'forestgreen';
          }}
          onClick={() => getPlantFamilies(stateData.name)}
          onMouseOut={(event) => {
            event.target.style.fill = 'springgreen';
          }}
        >
        </path>
      )}
    </svg>
  )
}

export default USMap;