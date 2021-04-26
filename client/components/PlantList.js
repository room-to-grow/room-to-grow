import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Grid";
// import helpers from '../../helpers';
import Button from "@material-ui/core/Grid";

useEffect(
  () => {
    console.log('fetching family list', gState);
    fetch(`/location/${gState}/${family}`)
      .then(response => response.json())
      .then(data => {
        console.log('fetched data:', data);
        setPlantList(data);
      })
      .catch(() => console.log('oops'))
  },
  [family]
)

const PlantList = props => {
  const [plantList, setPlantList] = useState(null);

  const { family } = props;
  const { gState } = props;

  if (plantList === null) return (<div></div>);

  else return (
    
  );
}


export default PlantList;
