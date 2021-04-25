import { Divider } from '@material-ui/core';
import React, { useState } from 'react';

// initial state of all 3 child components is null
// any time a component's state changes, the state of the next list is reset to null
// when a user clicks on an appropriate link in the existing state, 
// then that inforamtion feeds to the state of the next box

// will pass both the name of the US state and 
// and the list of plant families that was fetched before
// then display the list of plant families
// and onClick going to update the state property that we're creating here locally, which is the family selected
const ListsContainer = (props) => {
  // have the location as props
  // but how doo we pass over the data from the USMap sibling component?? a sibling??
  // want to use the value of the familyList state from

  return (
    <div statesData={} familyName={}>
      This is a lists container
    </div>
  )
}