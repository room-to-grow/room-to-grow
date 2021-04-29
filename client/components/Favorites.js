import React from 'react';
// import React, { useEffect, useState } from 'react';


const Favorites = props => {
  const { favorites } = props;
  const { loginName } = props;
  // const { favorites }

  console.log(favorites);
  // useEffect(
  //   () => {
  //     if (gState.name === null) return;
      
  //     // console.log('fetching family list', gState.name);
  //     fetch(`/location/${gState.name}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         // console.log('fetched data:', data);
  //         setFamiliesData(data.families);
  //         setfamilyListIsOpen(true)
  //         setGState({name : gState.name, slug : data.slug});
  //       })
  //       .catch(() => console.log('oops'))
  //   },
  //   [gState.name]
  // );



  return ( 
    <div id = "favorites-box">
      <h2 id = "favorites-title">
        {loginName +"'s " + "Favorites"} 
      </h2>
      <ul>
        {favorites.map((fav, index) => {
          return (
            <li id ="favorite-list-el" key={index}>
              <span className="details-field">{fav[0]}:</span> {}
            </li>
            //add delete button that calls a function that sends a post request to backend with a body of loginName and plantName
              //reset setFavorites with new favorites array
            //see notes button that will be a modal that will render the notes
              //
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;