import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import FamilyList from './FamilyList'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';
import Favorites from './Favorites';

const UserPage = (props) => {
    //states for usermenu
    const [statesData, setStatesData] = useState(null);
    const [statePlantsRender, setStatePlantRender] = useState(true);
    const [favoritesRender, setFavoritesRender] = useState(false);
    const [renderMap] = useState(true);

    useEffect(() => {
        fetch('https://willhaley.com/assets/united-states-map-react/states.json')
          .then(data => data.json())
          .then(data => {
            console.log(data);
            return data;
          })
          // Set the statesData with the data received from fetch().
          .then(res => setStatesData(res));
        }, [renderMap]);

    const plantContent = [<div id="listsContainer"><FamilyList gState={props.gState} setGState={props.setGState} setFamily={props.setFamily} setPlant={props.setPlant} setPlantDetails={props.setPlantDetails} />
                          <PlantList family={props.family} gState={props.gState} setPlant={props.setPlant} setPlantDetails={props.setPlantDetails} />
                          <PlantDetails family={props.family} plant={props.plant} gState={props.gState} plantDetails={props.plantDetails} setPlantDetails={props.setPlantDetails} setFavorites={props.setFavorites} favorites={props.favorites} loginName={props.loginName} /></div>]

    const favoritesContent = [<div id="favorites-container"><Favorites favorites={props.favorites} /* loginName={loginName} *//></div>]

    // If there is no statesData yet, show a loading indicator.
    let map = [<USMap id="us-map" statesData={statesData} setGState={props.setGState} setFamily={props.setFamily} setPlant={props.setPlant} setPlantDetails={props.setPlantDetails} />];
    console.log('rerendering usermenu', statesData);
    if (!statesData) {
        map = <div>Loading data...</div>;
    }

    let currentContent;
    if (statePlantsRender) currentContent = plantContent;
    if (favoritesRender) currentContent = favoritesContent 
    return(
        <div id="usermenu-container">
            {map}

            <button id="viewPlantsButton" className="fav-input" onClick={() => {
                if (!statePlantsRender) {
                    setFavoritesRender(false);
                    setStatePlantRender(true);
                }
            }}>View Plants</button>
            <button id="viewFavoritesButton" className="fav-input" onClick={() => {
                if (!favoritesRender) {
                    setFavoritesRender(true);
                    setStatePlantRender(false);
                }
            }}>View Favorites</button>
            <button id="logout" className="fav-input"  onClick={() => {
                setFavoritesRender(false);
                setStatePlantRender(true);
                props.logout(null);
            }}>Logout</button>

            {currentContent}
        </div>
    )
}

export default UserPage;