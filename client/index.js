import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import logo from './assets/roomToGrow2.png';

// uncomment so that webpack can bundle styles
import styles from './scss/application.scss';

const logoImg = document.getElementById('logo');
logoImg.src = logo;

render(
  <App />,
  document.getElementById('root')
);
