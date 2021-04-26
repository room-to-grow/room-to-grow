// import React, { useState } from 'react';
import React, {useEffect, useState} from 'react';
import { Button } from '@material-ui/core';
// import helpers from '../../helpers';

const FamilyList = props => {
  const [familiesData, setFamiliesData] = useState(null);

  const { gState } = props;
  const { setFamily } = props;
  const { setPlant } = props;

  useEffect(
    () => {
      console.log('fetching family list', gState);
      fetch(`/location/${gState}`)
        .then(response => response.json())
        .then(data => {
          console.log('fetched data:', data);
          setFamiliesData(data);
        })
        .catch(() => console.log('oops'))
    },
    [gState]
  );

  // return (<div></div>);

  if (familiesData === null) return (<div></div>)

  // else return (<div>hello heloo</div>)
  else return (
    <ul id="familyList">
      {familiesData.map((family, index) => {
        console.log(family);
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