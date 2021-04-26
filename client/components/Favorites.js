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
    <div>
      <h2>
        Favorites
      </h2>
      <ul>
        {favorites.map((fav, index) => {
          return (
            <li key={index}>
              {fav}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;