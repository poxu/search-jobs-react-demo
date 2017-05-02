import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import VacancyCard from './VacancyCard.js';
import SearchField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class VacancyList extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this);
        this.remoteSearch = this.remoteSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.props.sitys.update = this.remoteSearch;
        this.state = {
            loadBar: true,
            displayedVacancy: false,
            loadVacancy: false,
            SnackbarStatus: false,
            SearchCount: '',
            sitys: this.props.sitys.list
        };
    };
    componentDidMount = function(){
        this.remoteSearch(this.state.sitys)
    };
    remoteSearch = function(urlParams){
        let updateState = this.updateState,
            url = 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50';
        updateState({loadBar: true});
        urlParams = urlParams.map((item) =>{
            switch(item){
                case 0:
                    item = 1;
                    break
                case 1:
                    item = 2;
                    break
                case 2:
                    item = 43;
                    break
                default:
                    item = 1;
            }
            return ('&area=' + item)
        }).join('');
        url = url + urlParams;
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                updateState({
                    loadBar: false,
                    loadVacancy: data.items,
                    displayedVacancy: data.items,
                    SnackbarStatus: true,
                    SearchCount: data.items.length
                });
            })
            .catch(function(error) {
                console.log(error);
                return undefined;
        });
    };
    handleSearch = function(event) {
        let searchQuery = event.target.value.toLowerCase(), displayedVacancy;
        if(!searchQuery) {
            this.setState({
                displayedVacancy: this.state.loadVacancy,
                SearchCount: this.state.loadVacancy.length
            })
            return;
        }
        displayedVacancy = this.state.loadVacancy.filter(function(el) {
            let searchValue = el.name.toLowerCase() +
                '/n' + (el.snippet['responsibility'] ? el.snippet.responsibility.toLowerCase() : '') +
                '/n' + el.employer.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedVacancy: displayedVacancy,
            SnackbarStatus: true,
            SearchCount: displayedVacancy.length
        });
    };
    updateState = function(state){
        this.setState(state);
    };
    render = function() {
        if (this.state.loadBar) return (
            <div className='LoadBar'>
                <br />
                <CircularProgress size={100} thickness={10}/>
            </div>
        )
        return (
            <div className="VacancyList">
                <SearchField hintText="Поиск по вакансиям" fullWidth={true} onChange={this.handleSearch}/>
                <div>
                    {
                        this.state.displayedVacancy.map(function(el) {
                            let key = '' + el.alternate_url.match(/\d+/);
                            return (
                                <div key={key}>
                                    <VacancyCard data={el} />
                                    <br />
                                </div>
                            )
                        })
                    }
                    <Snackbar
                        open={this.state.SnackbarStatus}
                        message={"Найдено: " + this.state.SearchCount}
                        autoHideDuration={1500}
                    />
                </div>
            </div>
        );
    }
}