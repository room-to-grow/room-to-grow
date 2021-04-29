import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';
import logo from './assets/roomToGrow2.png'

document.getElementById('logo').src = logo;
let title = document.createElement('h1');
title.id = 'title';
title.innerHTML = 'Room To Grow';
document.getElementById('title-container').appendChild(title);

render(
  <App />,
  document.getElementById('root'),
);
