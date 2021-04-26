import React, { useEffect, useState } from 'react';

const PlantDetails = props => {
  const [plantDetails, setPlantDetails] = useState(null);

  const { gState } = props;
  const { family } = props;
  const { plant } = props;
  // const { plantDetails } = props;
  // const { setPlantDetails } = props;

  useEffect(
    // () => {
    //   if (gState === null || family === null || plant === null) return;
      
    //   fetch(`/${gState}/${family}/${plant}`)
    //     .then(response => response.json())
    //     .then(data => {
    //       setPlantDetails(data);
    //     })
    //     .catch(() => console.log('oops'));
    // },
    // [plant]
    // FOR TESTING W/O BACKEND ONLY
    () => {
      const obj = {
        detail1: 'green plant',
        detail2: 'edible'
      };
      setPlantDetails(obj);
      console.log('plantDeets', plantDetails);
    }, 
    [plant]
  );

  if (plant === null) return (<div></div>)

  else return (
    <ul id="detailsList">
      <li>
        {`sciName: ${plantDetails.scientific_name}`}
      </li>
      <li>
        {`common name: ${plantDetails.family_common_name}`}
      </li>
    </ul>
  );
}

/**
 * common_name: data.common_name,
    scientific_name: data.scientific_name,
    family_common_name: data.family_common_name,
    edible: data.edible,
    vegetable: data.vegetable,
    image_url: data.image_url,
    toxicity: data.specifications.toxicity,
    growth_habit: data.specifications.growth_habit,
    growth_form: data.specifications.growth_form,
    growth_rate: data.specifications.growth_rate,
    shape_and_orientation: data.specifications.shape_and_orientation,
    average_height: data.specifications.average_height.cm
 */
export default PlantDetails;