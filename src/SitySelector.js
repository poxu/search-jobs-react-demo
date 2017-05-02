import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const sitys = [
  {value: 0, name: 'Москва'},
  {value: 1, name: 'Санкт-Петербург'},
  {value: 2, name: 'Калуга'},
];

export default class SitySelector extends Component {
  state = {
    values: this.props.sitys.list,
  };

  handleChange = (event, index, values) => {
    this.props.sitys.update(values);
    this.setState({values})
  };

  selectionRenderer = (values) => {
    
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return sitys[values[0]].name;
      default:
        return `Выбрано ${values.length} города`;
    }
  }

  menuItems(sitys) {
    return sitys.map((sity) => (
      <MenuItem
        key={sity.value}
        insetChildren={true}
        checked={this.state.values.includes(sity.value)}
        value={sity.value}
        primaryText={sity.name}
      />
    ));
  }

  render() {
    return (
      <SelectField
        multiple={true}
        hintText="Выбор города"
        value={this.state.values}
        onChange={this.handleChange}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(sitys)}
      </SelectField>
    );
  }
}