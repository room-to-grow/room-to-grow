import React, { useState } from 'react';
import helpers from '../../helpers';

const USMap = (props) => {
  const { statesData } = props;
  // this is where the new state has to go
  // then can pass down to listscotnainer and down from there
  const [familyList, setFamilyList] = useState(null);

  return (
    <svg viewBox="0 0 960 600">
      {statesData.map((stateData, index) =>
        <path
          className="renederedMap"
          style={{cursor: "pointer", fill: "springgreen"}}
          key={index}
          stroke="#fff"
          strokeWidth="6px"
          d={stateData.shape}
          onMouseOver={(event) => {
            event.target.style.fill = 'forestgreen';
          }}
          onClick={() => 
            setFamilyList(helpers.getPlantFamilies(stateData.name))}
          onMouseOut={(event) => {
            event.target.style.fill = 'springgreen';
          }}
        >
        </path>
      )}
    </svg>
  )
}


export default USMap