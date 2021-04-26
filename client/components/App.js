// Normally these would be "import" statements, but this is a simple demo and
// is needed to render in the browser.
import React, { useEffect, useState } from 'react';
// import { Button } from '@material-ui/core';
import USMap from './USMap';
import FamilyList from './FamilyList'
// import ListsContainer from './ListsContainer';

// Functional component for the app. This handles loading the data and showing
// some sort of loading UI while waiting for the data.
const App = () => {
  // the collection of all of the states
  const [statesData, setStatesData] = useState(null);
  const [gState, setGState] = useState(null);
  const [family, setFamily] = useState(null);
  const [plant, setPlant] = useState(null);

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
    <div id="outer-container">
        <USMap 
            id="us-map" 
            statesData={statesData}
            setGState={setGState} 
            setFamily={setFamily}
            setPlant={setPlant}
        />
        <div id="ListsContainer">
          <FamilyList 
            gState={gState}
            // family={family}
            setFamily={setFamily}
            setPlant={setPlant}
          />
          {/* <PlantList
            family={family}
            gState={gState}
          /> */}
        </div>
        {/* <ListsContainer 
        
        /> */}
    </div>
  );
};

export default App;