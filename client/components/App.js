// Normally these would be "import" statements, but this is a simple demo and
// is needed to render in the browser.
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import USMap from './USMap';
import ListsContainer from './ListsContainer';

// Functional component for the app. This handles loading the data and showing
// some sort of loading UI while waiting for the data.
const App = () => {
    // the family selected by the user (on a click)
    const [selectedFamily, setSelectedFamily] = useState(null);

  // the collection of all of the states
  const [statesData, setStatesData] = useState(null);

  // the (geographic) US state selected by the User
  const [selectedGeoState, setSelectedGeoState] = useState(null);

  // the collection of all families provided from backend
  // that correspond to the selected US State
  const [familiesData, setFamiliesData] = useState(null);

  // the plant selected by the user
  const [selectedPlant, setSelectedPlant] = useState(null);

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
            setSelectedGeoState={setSelectedGeoState}
            setFamiliesData={setFamiliesData}
            setSelectedFamily={setSelectedFamily}
            setSelectedPlant={setSelectedPlant}
        />
        <ListsContainer 
            selectedGeoState={selectedGeoState}
            familiesData={familiesData}
            selectedPlant={selectedPlant}
            setSelectedPlant={setSelectedPlant}
            selectedFamily={selectedFamily}
            setSelectedFamily={setSelectedFamily}
            // selectedFamily={selectedFamily}
            // setSelectedFamily={setSelectedFamily}
            // plantsData={plantsData}           
            // plantDetails={plantDetails}
            // setPlantDetails={setPlantDetails}
            // setPlantsData={setPlantsData}
        />
    </div>
  );
};

export default App;