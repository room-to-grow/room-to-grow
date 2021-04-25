import React from 'react';
import { getPlantsData } from '../../helpers';

const PlantList = props => {
  const { selectedGeoState } = props;
  const { selectedFamily } = props;
  const { plantsData } = props;
  const { setSelectedPlant } = props;

  // set the plantsData using the selected geo state
  // make sure just passing string names to getPlantsData
  setPlantsData(getPlantsData(selectedGeoState, selectedFamily));

  // this is wrong- have to render nothing at first
  // and then only update once the family is not null
  // re-render every time the US fmaily changes
  // is this an effect????
  return (
    <ul>
      {plantsData.map(
        <li>
          <Button
            onClick={
              plant => {
                setSelectedPlant(plant.name);
              }
            }
          >
          </Button>
        </li>
      )}
    </ul>
  );
}


export default PlantList;
