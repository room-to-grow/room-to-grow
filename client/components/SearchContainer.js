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

  const [zipError, setZipError] = useState(null);
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
      setPrevState(gState.name);
      const state = map.getElementById(gState.name);
      state.style.fill = 'orange';
    }
  }, [gState.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(states[0].attributes[2].value);
    fetch(`https://us-zipcode.api.smartystreets.com/lookup?auth-id=5bcc57bf-d427-6a53-2fe1-c4e618216065&auth-token=qGN37gyZ7lZyhWQ0p9m3&city=&state=&zipcode=${zip}`)
      .then((res) => res.json())
      .then((results) => {
        if (!results[0].city_states) {
          setZipError('ZIP not found! Please check and search again.');

          // setZipError("render")
        } else {
          setGState({ name: results[0].city_states[0].state, slug: null });
          setZipError(null);
        }
      });
  };

  return (
    <div className="zip-search">
      <h1>Enter Your ZIP to search, or click on the map below</h1>
      <form onSubmit={handleSubmit}>
        <input className="test" type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
      <div id="zip-error">{zipError}</div>
    </div>
  );
};

export default SearchContainer;
