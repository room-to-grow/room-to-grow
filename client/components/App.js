// Normally these would be "import" statements, but this is a simple demo and
// is needed to render in the browser.
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import USMap from './USMap';

// Functional component for the SVG map. Take in the map JSON data as a prop and
// return SVG.
// const USMap = (props) => {
//     const { statesData } = props;
  
//     return (
//       <svg viewBox="0 0 960 600">
//         {statesData.map((stateData, index) =>
//           <path
//             className="someCSSClass"
//             style={{cursor: "pointer", fill: "springgreen"}}
//             key={index}
//             stroke="#fff"
//             strokeWidth="6px"
//             d={stateData.shape}
//             onMouseOver={(event) => {
//               event.target.style.fill = 'forestgreen';
//             }}
//             onClick={() => getPlantFamilies(stateData.name)}
//             onMouseOut={(event) => {
//               event.target.style.fill = 'springgreen';
//             }}
//           >
//           </path>
//         )}
//       </svg>
//     )
//   }

const Family = (props) => {
  
    const { name } = props
    console.log("props passed down to Family: ", props)

    return (

      <div class = "family-container">
        
        <Button style={{
          color: "#7dc882",
          fontSize: "1.2em"
        }}> {name} 
        </Button>
      </div> 
    )
}
const FamilyList = (props) => {
  console.log('PROPS PASSED DOWN TO FAMILYLIST: ', props);
  const { familiesData } = props;
  console.log(typeof familiesData)

  // if(!familiesData) return (
  //   <div>
  //     <h1> NO! </h1>
  //   </div>

  // )
  

  return (
    <div>
    {console.log(familiesData[0])}
    {/* {<Family name = {familiesData[0]} />} */}
    {familiesData.map((familyData, index) => <Family name={familyData} key={index} />)}
      {/* {familiesData.forEach(el => {
        <Family name={el} />
      })
       
      } */}
      {/* {"this is something"} */}
    </div>
  )
}

// Functional component for the app. This handles loading the data and showing
// some sort of loading UI while waiting for the data.
const App = () => {
  // The statesData is null by default until we set it.
  const [statesData, setStatesData] = useState(null);
  const [familiesData, setFamiliesData] = useState(["family list"]);
  // but for plantsData, the function will be passed into the familylist component

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
    <div>
      <div id="map-container">
        <USMap id="us-map" statesData={statesData} setFamiliesData={setFamiliesData} />
      </div>
      <div id="family-list">
        <FamilyList familiesData={familiesData} />
      </div>
        {/* <ListsContainer /> */}
    </div>
  );
};

  
// function App() { 
//     // const [count, setCounter] = useState(0);

//     return (
//         <div className = "initial"> hi this is hooks.  and this is some test text! </div> 
//     )
// }

export default App;