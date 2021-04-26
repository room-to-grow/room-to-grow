import React from 'react';
// import React, { useEffect, useState } from 'react';


const Favorites = props => {
  const { favorites } = props;

  // useEffect(() => {
  //   // make a fetch to the server for the favorites list

  // },
  // [favorites])
  console.log(favorites);

  return ( 
    <div id = "favorites-box">
      <h2 id = "favorites-title">
        Favorites
      </h2>
      <ul>
        {favorites.map((fav, index) => {
          return (
            <li id ="favorite-list-el" key={index}>
              {fav}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;