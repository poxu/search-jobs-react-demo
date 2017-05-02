import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

export default class VacancyCard extends React.Component {

  constructor(props) {
    super(props);
    this.UpdateLike = this.UpdateLike.bind(this);
    this.state = {
      data: this.dataValidator(this.props.data),
      likeStatus: !!localStorage.getItem(this.props.data.alternate_url)
    };
  };

  UpdateLike = function(event, status){
    localStorage.setItem(this.state.data.link, status)
    this.setState({likeStatus: status});
  };

  setIndetificator = function(status){
    let UpdateLike = this.UpdateLike
    return function (event, status) {
      UpdateLike(event, status);
    }
  };

  dataValidator = function(el){
    return {
        name: el.name,
        link: el.alternate_url,
        description: el.snippet['responsibility'] ? el.snippet['responsibility'] : "Детальное описание доступно на сайте...",
        area: el.area.name,
        salary: (() => {
            let salary = el.salary,
                result = '';
            if(salary){
                if(salary.from) result += 'От ' + salary.from + ' ';
                if(salary.to) result += 'До ' + salary.to + ' ';
                if(salary.currency) result += salary.currency;
                return result;
            }else{
                return 'Договорная'
            }
        })(),
        employerName: el.employer.name,
        employerImg: el.employer.logo_urls ? el.employer.logo_urls["90"] : 'http://coachcentrug.ru/wp-content/uploads/2016/09/hh-768x767.png',
        employerProfile: el.employer.alternate_url
    }
  };

  render() {
    return (
      <Card>
        <a href={this.state.data.employerProfile}><CardHeader
          title={this.state.data.employerName}
          avatar={this.state.data.employerImg}
          subtitle={this.state.data.area}
        /></a>
        <CardTitle title={this.state.data.name} subtitle={this.state.data.salary}/>
        <CardText>
          {this.state.data.description}
        </CardText>
        <CardActions>
          <div style={{display: 'flex', flexDirection: 'row', JustifyContent: 'space-between'}}>
            <div >
              <FlatButton label="Откликнуться" href={this.state.data.link}/>
            </div >
            <div >
              <Checkbox
                checked={this.state.likeStatus}
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                onCheck={this.setIndetificator()}
                onClick={this.setIndetificator()}
              />
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}