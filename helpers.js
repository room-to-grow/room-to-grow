
const helpers = {};

helpers.getPlantFamilies = (stateName) => {
  //console.log("STATE :", stateName)
    fetch(`/location/${stateName}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

export default helpers;