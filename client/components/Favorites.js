// import React from 'react';
import React, { useEffect, useState } from 'react';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import NotesIcon from './NotesIcon.js';
// import React, { useEffect, useState } from 'react';



const Favorites = props => {
  const { favorites } = props;
  const { loginName } = props;
  const { deleteFav } = props; 
  const [notesIsOpen, toggleNotes] = useState(false)
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

  const openDetailsModal = (e, id) => {
    const top = e.pageY;
    const left = e.pageX;
    openModal({ top, left }, id);
  };

  

  return ( 
    <div id = "favorites-box">
      <h3 id = "favorites-title">
        {loginName +"'s " + "Favorites"} 
      </h3>
      <ul>
        {favorites.map((fav, index) => {
          return (
            <li id ="favorite-list-el" key={index}>
              
              <span className="details-field">{fav[0]}:</span> 
              
              <button className="deleteFav-btn" onClick={() => deleteFav(fav[0])}>Delete</button>

              <div className='notesContainer'>
              {!notesIsOpen ? (
              <button onClick={() => toggleNotes(true)}>See Notes:</button>
              ) : (
                <div className='Notespopup-box'>
                  <div className='notes-box'>
                    <span className='notesclose-icon' onClick={() => {revertDetailStates()}}>x</span>
                  </div>
                </div>
              )}
              </div>
              
              {/* <span className='icon'><NotesIcon icon={faQuestionCircle} size='xs' style={{color: 'steelBlue'}} onClick={(e) => openDetailsModal(e, fav[0])}/></span> */}
            </li>
            // <span className='icon' onClick={(e) => {openDetailsModal(e, ,}}/></span>
            //need a button to that will call function openDetailsModal w/ params of e, 'fav', plant_id
              //openDetailsModal will declare two constants top and left that will equal e.pageX and e.pageY
                //openDetailsModal will now call openModal passing in params of type, { top, left }, id
            //openModal button will have arguments type, position, id
              //openModal will change the state of modalState
                //make key open to true, type, position, id
            //also need to make a closeModal
            // <button
            //add delete button that calls a function that sends a post request to backend with a body of loginName and plantName
            
              //reset setFavorites with new favorites array
            //see notes button that will be a modal that will render the notes
              //

              // const openDetailsModal = (e, type, id) => {
              //   const top = e.pageY;
              //   const left = e.pageX;
              //   openModal(type, { top, left }, id);
              // };

              // openModal(type, position, id) {
              //   this.setState({
              //     modalState: {
              //       ...this.state.modalState,
              //       open: true,
              //       type,
              //       position,
              //       id
              //     }
              //   });
              // }
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;