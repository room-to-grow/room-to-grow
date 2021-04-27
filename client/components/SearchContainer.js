// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';


//import { Button } from '@material-ui/core';
// import helpers from '../../helpers';

const SearchContainer = props => {

    const [zip, setZip] = useState('');
    const [stateName, setStateName] = useState('');


    useEffect(() => {
        if (zip.length === 5) {
            fetch(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=8080af26-2034-980b-db2b-27c331ba5a10&auth-token=HTt0NXbVbAUzn9S9XwQi&zipcode=${zip}`)
                .then(res => res.json())
                .then(results => setStateName(results[0].city_states[0].state))
                .then(console.log(stateName))
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`About to search for ${stateName}`)
        fetch(`/location/${stateName}`)
    }

    return (
        <div className="zip-search">
            <h1>Enter Your ZIP to search, or click on the map below</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={zip} onChange={e => setZip(e.target.value)} />
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )

}

export default SearchContainer;