import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import VacancyCard from './VacancyCard.js';
import SearchField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class App extends Component {
  render() {
    return (
        <VacancyList />
    );
  }
}

let VacancyObjectList;

var VacancyList = React.createClass({
    getInitialState: function() {
        return {
            isStart: true,
            displayedVacancy: false,
            SnackbarStatus: false,
            SearchCount: ''
        };
    },
    componentDidMount: function(){
        const url = 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50';
        let updateList = this.updateList;
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                VacancyObjectList = data.items;
                updateList(VacancyObjectList);
            })
            .catch(function(error) {
                console.log(error);
                return undefined;
        });
    },
    handleSearch: function(event) {
        let searchQuery = event.target.value.toLowerCase(), displayedVacancy;
        if(!searchQuery) {
            this.setState({SearchCount: 50  })
            return;
        }
        displayedVacancy = VacancyObjectList.filter(function(el) {
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
    },
    updateList: function(items){
        this.setState({
            isStart: false,
            displayedVacancy: items
        });
    },
    render: function() {
        if (this.state.isStart) return (
            <div className='LoadBar'>
                <br />
                <CircularProgress size={80} thickness={5}/>
            </div>
        )
        return (
            <div className="VacancyList">
                <SearchField hintText="Поиск по вакансиям" fullWidth={true} onChange={this.handleSearch}/>
                <div>
                    {
                        this.state.displayedVacancy.map(function(el) {
                            let key = '' + el.alternate_url.match(/\d+/);
                            let data = {
                                name: el.name,
                                link: el.alternate_url,
                                description: el.snippet['responsibility'] ? el.snippet['responsibility'] : "Детальное описание доступно на сайте...",
                                employerName: el.employer.name,
                                employerImg: el.employer.logo_urls ? el.employer.logo_urls["90"] : 'http://coachcentrug.ru/wp-content/uploads/2016/09/hh-768x767.png',
                                employerProfile: el.employer.alternate_url
                            }
                            return (
                                <div key={key}>
                                    <VacancyCard data={data} />
                                    <br />
                                </div>
                            )
                        })
                    }
                    <Snackbar
                        open={this.state.SnackbarStatus}
                        message={"Найдено: " + this.state.SearchCount}
                        autoHideDuration={1000}
                    />
                </div>
            </div>
        );
    }
});