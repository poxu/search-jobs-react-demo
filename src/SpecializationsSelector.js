const list = [
  {
    "id": "1.395",
    "name": "Банковское ПО"
  },
  {
    "id": "1.400",
    "name": "Оптимизация сайта (SEO)"
  },
  {
    "id": "1.420",
    "name": "Администратор баз данных"
  },
  {
    "id": "1.474",
    "name": "Стартапы"
  },
  {
    "id": "1.475",
    "name": "Игровое ПО"
  },
  {
    "id": "1.536",
    "name": "CRM системы"
  },
  {
    "id": "1.3",
    "name": "CTO, CIO, Директор по IT"
  },
  {
    "id": "1.9",
    "name": "Web инженер"
  },
  {
    "id": "1.10",
    "name": "Web мастер"
  },
  {
    "id": "1.25",
    "name": "Аналитик"
  },
  {
    "id": "1.30",
    "name": "Арт-директор"
  },
  {
    "id": "1.50",
    "name": "Системы управления предприятием (ERP)"
  },
  {
    "id": "1.82",
    "name": "Инженер"
  },
  {
    "id": "1.89",
    "name": "Интернет"
  },
  {
    "id": "1.110",
    "name": "Компьютерная безопасность"
  },
  {
    "id": "1.113",
    "name": "Консалтинг, Аутсорсинг"
  },
  {
    "id": "1.116",
    "name": "Контент"
  },
  {
    "id": "1.117",
    "name": "Тестирование"
  },
  {
    "id": "1.137",
    "name": "Маркетинг"
  },
  {
    "id": "1.161",
    "name": "Мультимедиа"
  },
  {
    "id": "1.172",
    "name": "Начальный уровень, Мало опыта"
  },
  {
    "id": "1.203",
    "name": "Передача данных и доступ в интернет"
  },
  {
    "id": "1.211",
    "name": "Поддержка, Helpdesk"
  },
  {
    "id": "1.221",
    "name": "Программирование, Разработка"
  },
  {
    "id": "1.225",
    "name": "Продажи"
  },
  {
    "id": "1.232",
    "name": "Продюсер"
  },
  {
    "id": "1.246",
    "name": "Развитие бизнеса"
  },
  {
    "id": "1.270",
    "name": "Сетевые технологии"
  },
  {
    "id": "1.272",
    "name": "Системная интеграция"
  },
  {
    "id": "1.273",
    "name": "Системный администратор"
  },
  {
    "id": "1.274",
    "name": "Системы автоматизированного проектирования"
  },
  {
    "id": "1.277",
    "name": "Сотовые, Беспроводные технологии"
  },
  {
    "id": "1.295",
    "name": "Телекоммуникации"
  },
  {
    "id": "1.296",
    "name": "Технический писатель"
  },
  {
    "id": "1.327",
    "name": "Управление проектами"
  },
  {
    "id": "1.359",
    "name": "Электронная коммерция"
  }
]

import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];
list.forEach((item, i) => {
  items.push(<MenuItem value={i} key={i} primaryText={item} />);
})  

const sitys = [
  {value: 0, name: 'Москва'},
  {value: 1, name: 'Санкт-Петербург'},
  {value: 2, name: 'Калуга'},
];

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
export default class SpecializationsSelector extends Component {
  state = {
    values: this.props.sitys.list,
  };

  handleChange = (event, index, values) => {
    this.props.sitys.update(values);
    /*console.log(this.props.sitys);*/
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

  menuItems(items) {
    return items.map((item) => (
      <MenuItem
        key={item.value}
        insetChildren={true}
        checked={this.state.values.includes(item.value)}
        value={item.value}
        primaryText={item.name}
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
        maxHeight={500}
      >
        {this.menuItems(sitys)}
      </SelectField>
    );
  }
}