// import { ModuleFilenameHelpers } from "webpack";

const helpers = {};

helpers.getPlantFamilies = (stateName) => {
  //console.log("STATE :", stateName)
  let familyList;

  fetch(`/location/${stateName}`)
    .then(response => response.json())
    .then(data => console.log(data));  

  return ([
    'family1', 
    'family2'
  ])
}

helpers.getPlantsData = (stateName, familyName) => {
  
  // this will take the state name and family name
  // and use those to make a fetch request to the server
  // which should return an array of plants satisfying those critera

  return ([
    { name: 'firstName' },
    { name: 'secondName' },
  ]);
}

helpers.getPlantDetails = (plantName) => {

  // this func will take the plantName
  // and fetch the pertinent plant details from the server
  // for populating int he front end

  return ({
    detail1: 'plantName',
    detail2: 'something cool about this plant'
  })
}

export default helpers;