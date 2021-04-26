import React, {useEffect, useState} from 'react';
import { Button } from '@material-ui/core';


const PlantList = props => {
  const [plantList, setPlantList] = useState(null);

  const { family } = props;
  const { gState } = props;
  // const { setPlantDetails } = props;
  const { setPlant } = props;

  useEffect(
    // () => {
    //   console.log('fetching plant list', gState);
    //   fetch(`/location/${gState}/${family}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('fetched data:', data);
    //       setPlantList(data);
    //       setPlantDetails(null);
    //     })
    //     .catch(() => console.log('oops'))
    // },
    // [family]
    () => {
      setPlantList(['rose', 'grass', 'amarillys']);
      // setPlantDetails(null);
    },
    [family]
  )
  
  if (family === null) return (<div></div>);
  // else return (<div>heloo hello</div>)
  else return (
    <ul id="plantList">
    {plantList.map((plant, index) => {
      console.log('plant:', plant);
      return (
        <li key={index}>
          <Button 
            onClick={
              () => {
                setPlant(plant);
                // setPlantDetails(null);
              }
            }
          >
            {plant}
          </Button>
        </li>
      )
    })}
  </ul>

  );
}


export default PlantList;
