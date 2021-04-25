// import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FamilyList from './FamilyList';
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';

// this component will use the selected Geo state
// and the familiesData
// to populate its child components
const ListsContainer = (props) => {

  // the list of plants provided from backend
  // that correspond to the geographic state and the family chosen by the user
  const [plantsData, setPlantsData] = useState(null);

    // the plant details provided from backend
  // that correspond to the plant selected by the user
  const [plantDetails, setPlantDetails] = useState(null);

  const { selectedGeoState } = props;
  const { familiesData } = props;
  const { selectedPlant } = props;
  const { setSelectedPlant } = props;
  const { selectedFamily } = props;
  const { setSelectedFamily } = props;
  // const { plantsData } = props;
  // const { setPlantDetails } = props;
  // const { plantDetails } = props;
  // const { setPlantsData } = props;

  // // the list of plants provided from backend
  // // that correspond to the geographic state and the family chosen by the user
  // const [plantsData, setPlantsData] = useState(null);

  // // the plant selected by the user
  // const [selectedPlant, setSelectedPlant] = useState(null);

  // // the plant details provided from backend
  // // that correspond to the plant selected by the user
  // // const [plantDetails, setPlantDetails] = useState(null);


  return (
    <div id="ListsContainer">
      {
      /**
       * familyList will display the familiesData
       * and provide functioanlity to select the family for display
       * in teh adjacent FamilyList component
       */
      }
      <FamilyList 
        id="familyList" 
        selectedGeoState={selectedGeoState}
        familiesData={familiesData}
        setSelectedPlant={setSelectedPlant}
        setSelectedFamily={setSelectedFamily}
      />

      {
      /**
       * plantList will use the selected family
       * to display the plantsData (list of plants from that family and geographic state)
       */
      }
      <PlantList 
        id="plantList"
        selectedGeoState={selectedGeoState}
        selectedFamily={selectedFamily}
        plantsData={plantsData}
        selectedPlant={selectedPlant}
        setSelectedPlant={setSelectedPlant}
        setPlantsData={setPlantsData}
        // setPlantDetails={setPlantDetails}
      />

      {
      /**
       * plantDetails will use the selected plant
       * to get and display the details of that plant
       */
      }
      <PlantDetails 
        id="plantDetails"
        selectedPlant={selectedPlant}
        setPlantsData={setPlantsData}
        plantDetails={plantDetails}
        setPlantDetails={setPlantDetails}
      />
    </div>
  )
}

export default ListsContainer;