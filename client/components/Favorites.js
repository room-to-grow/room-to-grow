import React from 'react';
// import React, { useEffect, useState } from 'react';


const Favorites = props => {
  const { favorites } = props;
  // const { favorites }

  // console.log(favorites);

  return (
    <div id="favorites-box">
      <h2 id="favorites-title">
        Favorites
      </h2>
      <ul>
        {favorites.map((fav, index) => {
          return (
            <li id="favorite-list-el" key={index}>
              <span className="details-field">{fav.name}:</span> {fav.notes}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;