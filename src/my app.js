import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Список вакансий</h1>
        <VacancyList />
      </div>
    );
  }
}

var Vacancy = React.createClass({
    render: function() {
        let
			name = this.props.data.name,
			link = this.props.data.alternate_url,
			description = this.props.data.snippet.responsibility,
			employer = this.props.data.employer,
            employerName = employer.name,
			employerImg = employer.logo_urls ? employer.logo_urls["90"] : 'http://badumka.ru/images/1079071_krestik-krasnyi-png.jpg',
			employerProfile = this.props.data.employer.alternate_url;
        return (
            <li className="vacancy">
                <a href={employerProfile}>
					<img className="vacancy-image" src={employerImg} href='employerProfile' />
				</a>
                <div className="vacancy-info">
                    <a href={link}>
                        <div className="vacancy-name"> <b>{name}</b> </div>
                    </a>
                    <div className="vacancy-description"> {description} </div>
                </div>
            </li>
        );
    }
});

var VacancyList = React.createClass({
    getInitialState: function() {
        return {
            isStart: true,
            displayedVacancy: false
        };
    },
    componentDidMount: function(){
        const url = 'https://api.hh.ru/vacancies?specialization=1.221&per_page=50';
        let updateList = this.updateList;
        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                updateList(data.items);
            })
            .catch(function(error) {
                console.log(error);
                return undefined;
        });
    },
    /*handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function(el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedContacts: displayedContacts
        });
    },*/
    updateList: function(items){
        this.setState({
            isStart: false,
            displayedVacancy: items
        });
    },
    render: function() {
        if (this.state.isStart) return (
            <img src='https://preloaders.net/preloaders/374/Calculator.gif'/>
        )
        return (
            <div className="VacancyList">
                <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch} />
                <ul className="vacancy-list">
                    {
                        this.state.displayedVacancy.map(function(el) {
                            let key = '' + el.alternate_url.match(/\d+/);
                            return <Vacancy data={el} key={key}/>;
                        })
                    }
                </ul>
            </div>
        );
    }
});