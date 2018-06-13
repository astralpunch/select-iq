import React, { Component } from 'react';
import classnames from 'classnames';

import Option from './Option';

class OptionsList extends Component {
  optionsListRef = React.createRef();

  state = {
    isFliped: false,
  };

  componentDidMount() {
    this.scrollToSelected();

    const listElemBottom =
      this.optionsListRef.current && this.optionsListRef.current.getBoundingClientRect().bottom;

    this.setState({
      isFliped: listElemBottom > window.innerHeight,
    });
  }

  scrollToSelected = () => {
    if (!this.optionsListRef.current || !this.props.isExpanded || this.props.options.length < 1) {
      return;
    }

    const selectedItem = this.optionsListRef.current.querySelector('.select__option--selected');

    if (selectedItem) {
      this.optionsListRef.current.scrollTop = selectedItem.offsetTop;
    }
  };

  getOptions = () =>
    this.props.options.map(option => (
      <Option
        key={option.value}
        option={option}
        selected={this.props.selected}
        selectOption={this.props.selectOption}
        value={this.props.value}
      />
    ));

  getMenu = () => {
    const { options } = this.props;

    if (!!options.length) {
      return (
        <div
          className={classnames('select__menu', {
            'select__menu--opened-up': this.state.isFliped,
          })}
          ref={this.optionsListRef}
        >
          {<ul>{this.getOptions()}</ul>}
        </div>
      );
    }

    return <div className="select__menu select__menu--empty">Данные не найдены</div>;
  };

  render() {
    return this.getMenu();
  }
}

export default OptionsList;
