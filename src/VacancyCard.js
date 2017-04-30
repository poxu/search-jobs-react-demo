import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = (params) => (
  <Card>
    <a href={params.data.employerProfile}><CardHeader
      title={params.data.employerName}
      avatar={params.data.employerImg}
    /></a>
    <CardTitle title={params.data.name} />
    <CardText>
      {params.data.description}
    </CardText>
    <CardActions>
      <FlatButton label="Откликнуться" href={params.data.link} />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;