/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

// import { Button } from '@material-ui/core';
// import helpers from '../../helpers';

const SearchContainer = (props) => {
  const { zip } = props;
  const { setZip } = props;
  const { gState } = props;
  const { setGState } = props;

  const [prevState, setPrevState] = useState('Florida');
  // const states = document.querySelectorAll('path');

  // function useDidMount() {
  //   const mountRef = useRef(false);

  //   useEffect(() => { mountRef.current = true }, []);

  //   return () => { mountRef.current };
  // }

  // const didMount = useDidMount();

  useEffect(() => {

    if (document.getElementById('map-svg')) {
      const map = document.getElementById('map-svg');
      const prevStateTag = map.getElementById(prevState);
      prevStateTag.style.fill = '#373737';
      setPrevState(gState.name)
      const state = map.getElementById(gState.name);
      state.style.fill = 'orange';
    }

  }, [gState.name])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(states[0].attributes[2].value);
    fetch(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=3afe3193-f166-1706-b1e6-c5cfa1e36a0f&auth-token=vbtl6TwJILdnWrp6KxY7&city=&state=&zipcode=${zip}`)
      .then((res) => res.json())
      .then((results) => setGState({ name: results[0].city_states[0].state, slug: null }))

    // console.log(gState.name);
  };

  return (
    <div className="zip-search">
      <h1>Enter Your ZIP to search, or click on the map below</h1>
      <form onSubmit={handleSubmit}>
        <input className="test" type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default SearchContainer;
