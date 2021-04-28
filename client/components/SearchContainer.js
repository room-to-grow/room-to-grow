// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom"

//import { Button } from '@material-ui/core';
// import helpers from '../../helpers';

const SearchContainer = props => {

    const { zip } = props;
    const { setZip } = props;
    const { gState } = props;
    const { setGState } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=3afe3193-f166-1706-b1e6-c5cfa1e36a0f&auth-token=vbtl6TwJILdnWrp6KxY7&city=&state=&zipcode=${zip}`)
            .then(res => res.json())
            .then(results => setGState({ name: results[0].city_states[0].state, slug: null }))
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