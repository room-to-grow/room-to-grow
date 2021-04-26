import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import FamilyList from './FamilyList'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';

const App = () => {
  // the collection of all of the states
  const [statesData, setStatesData] = useState(null);
  const [gState, setGState] = useState({name : null, slug : null});
  const [family, setFamily] = useState(null);
  const [plant, setPlant] = useState(null);
  const [plantDetails, setPlantDetails] = useState(null);

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
          setPlantDetails={setPlantDetails}
        />
        <div id="listsContainer">
          <FamilyList 
            gState={gState}
            setGState={setGState}
            setFamily={setFamily}
            setPlant={setPlant}
            setPlantDetails={setPlantDetails}

          />
          <PlantList
            family={family}
            gState={gState}
            setPlant={setPlant}
            setPlantDetails={setPlantDetails}
          />
          <PlantDetails
            family={family}
            plant={plant}
            gState={gState}
            plantDetails={plantDetails}
            setPlantDetails={setPlantDetails}
          />
        </div>
    </div>
  );
};

export default App;