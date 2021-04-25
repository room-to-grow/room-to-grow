import React from 'react';
import helpers from '../../helpers';
import Button from "@material-ui/core/Grid";


const PlantList = props => {
  const { selectedGeoState } = props;
  const { selectedFamily } = props;
  const { plantsData } = props;
  const { setSelectedPlant } = props;
  const { setPlantsData } = props;

  // set the plantsData using the selected geo state
  // make sure just passing string names to getPlantsData

  // setPlantsData(helpers.getPlantsData(selectedGeoState, selectedFamily));

  // this is wrong- have to render nothing at first
  // and then only update once the family is not null
  // re-render every time the US fmaily changes
  // is this an effect????
  if (selectedFamily === null) return (<div></div>)
  else return (
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
