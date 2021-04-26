// import React, { useState } from 'react';
import React, {useEffect, useState} from 'react';
import { Button } from '@material-ui/core';
// import helpers from '../../helpers';

const FamilyList = props => {
  const [familiesData, setFamiliesData] = useState(null);

  const { gState } = props;
  const { setFamily } = props;
  const { setPlant } = props;

  // families receives object
  // first k-v pair 
  // have to get the slug and pass back to backend with the family name
  // similalry with plants, will receive slug and family name
  useEffect(
    () => {
      if (gState === null) return;

      // console.log('fetching family list', gState);
      fetch(`/location/${gState}`)
        .then(response => response.json())
        .then(data => {
          // console.log('fetched data:', data);
          setFamiliesData(data.families);
        })
        .catch(() => console.log('oops'))
    },
    [gState]
  );

  if (familiesData === null) return (<div></div>)
  else return (
    <ul id="familyList">
      {familiesData.map((family, index) => {
        // console.log(family);
        return (
          <li key={index}>
            <Button 
              onClick={
                () => {
                  setFamily(family);
                  setPlant(null);
                }
              }
            >
              {family}
            </Button>
          </li>
        )
      })}
    </ul>
  );
}

export default FamilyList;