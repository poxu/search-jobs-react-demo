import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.js';
import './styles.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

const ThemApp = () => (
  <MuiThemeProvider>
    <App className='app'/>
  </MuiThemeProvider>
);

ReactDOM.render(<ThemApp />, document.getElementById('root'));
