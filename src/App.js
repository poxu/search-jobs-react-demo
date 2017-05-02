import React, { Component } from 'react';
import VacancyList from './VacancyList.js';
import ToolBar from './ToolBar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

export default class App extends Component {
    state = {
        sitys: {
            list: [0,1,2],
            update: this.sitySearch
        }
    };
    sitySearch = val => {};
    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <ToolBar sitys={this.state.sitys} sitySearch={this.sitySearch}/>
                    <VacancyList sitys={this.state.sitys} updateSitys={this.state.updateSitys}/>
                </div>
            </MuiThemeProvider>
        )
    };
}



