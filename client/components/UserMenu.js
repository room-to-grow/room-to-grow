import React, { useEffect, useState } from 'react';
import USMap from './USMap';
import FamilyList from './FamilyList'
import PlantList from './PlantList';
import PlantDetails from './PlantDetails';
import Favorites from './Favorites';
import SearchContainer from './SearchContainer';

const UserPage = (props) => {
    //states for usermenu
    const [renderView, setRenderView] = useState('plants');
    const [gState, setGState] = useState({name : null, slug : null});
    const [family, setFamily] = useState(null);
    const [plant, setPlant] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [statesData, setStatesData] = useState(null);
    const [renderMap] = useState(true);
    const [zip, setZip] = useState('');

    useEffect(() => {
        fetch('https://willhaley.com/assets/united-states-map-react/states.json')
          .then(data => data.json())
          // Set the statesData with the data received from fetch().
          .then(res => setStatesData(res));
    }, [renderMap]);

    const plantContent = [<div id="listsContainer"><FamilyList gState={gState} setGState={setGState} setFamily={setFamily} setPlant={setPlant} setPlantDetails={setPlantDetails} />
                          <PlantList family={family} gState={gState} setPlant={setPlant} setPlantDetails={setPlantDetails} />
                          <PlantDetails family={family} plant={plant} gState={gState} plantDetails={plantDetails} setPlantDetails={setPlantDetails} setFavorites={setFavorites} favorites={favorites} loginName={props.loginName} /></div>]

    const favoritesContent = [<div id="favorites-container"><Favorites favorites={favorites} loginName={props.loginName}/></div>]

    // If there is no statesData yet, show a loading indicator.
    let map = <div>Loading states map...</div>;
    if (statesData) {
        map = [<USMap id="us-map" statesData={statesData} setGState={setGState} setFamily={setFamily} setPlant={setPlant} setPlantDetails={setPlantDetails} />];
    }

    let currentContent;
    console.log(renderView)
    switch(renderView) {
        case "plants":
            currentContent = plantContent;
            break;
        case 'favorites':
            currentContent = favoritesContent;
            break;
    }

    return(
        <div id="info-container">
        <SearchContainer
            zip={zip}
            setZip={setZip}
            gState={gState}
            setGState={setGState}
            />
            {map}
            <div id="usermenu-container">

                <button id="viewPlantsButton" className="fav-input" onClick={() => {
                    if (renderView !== 'plants') setRenderView('plants');
                }}>View Plants</button>

                <button id="viewFavoritesButton" className="fav-input" onClick={() => {
                    if (renderView !== 'favorites') setRenderView('favorites');
                }}>View Favorites</button>

                <button id="logout" className="fav-input"  onClick={() => {
                    setRenderView('plants');
                    props.logout(null);
                }}>Logout</button>

                {currentContent}
            </div>
        </div>
    )
}

export default UserPage;