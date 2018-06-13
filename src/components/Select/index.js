import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withClickOutside } from './withClickOutside';
import SearchInput from './SearchInput';
import OptionsList from './OptionsList';

class Select extends Component {
  static defaultProps = {
    options: [],
    onChange: () => {},
    onInput: () => {},
  };

  state = {
    isExpanded: false,
    showNativeSelect: false,
  };

  clickOutsideHandler = () => {
    if (this.state.isExpanded) {
      this.toggleMenu();
    }

    if (this.state.showNativeSelect) {
      this.toggleNativeSelect();
    }
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  toggleNativeSelect = () => {
    this.setState(prevState => ({ showNativeSelect: !prevState.showNativeSelect }));
  };

  selectOptionHandler = option => () => {
    this.props.onChange(option);
    this.toggleMenu();
  };

  nativeSelectValueHandler = e => {
    const { value } = e.target;
    const selectedOption = this.props.options.filter(option => option.value === value)[0];

    this.props.onChange(selectedOption);
    this.toggleNativeSelect();
  };

  renderInput = () => {
    return (
      <SearchInput
        placeholder={this.props.placeholder}
        onInput={this.props.onInput}
        value={this.props.value}
        selected={this.props.selected}
        isExpanded={this.state.isExpanded}
        toggleNativeSelect={this.toggleNativeSelect}
        toggleMenu={this.toggleMenu}
      />
    );
  };

  renderOptions = () => {
    if (!this.state.isExpanded) return null;

    return (
      <OptionsList
        options={this.props.options}
        isExpanded={this.state.isExpanded}
        selectOption={this.selectOptionHandler}
        selected={this.props.selected}
        value={this.props.value}
      />
    );
  };

  renderSelect = () => {
    const { selected, options } = this.props;

    if (!this.state.showNativeSelect) {
      return (
        <div className="select">
          {this.renderInput()}
          {this.renderOptions()}
        </div>
      );
    }

    return (
      <select onChange={this.nativeSelectValueHandler} value={selected ? selected.value : ''}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  render() {
    return this.renderSelect();
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  value: PropTypes.string,
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  placeholder: PropTypes.string,
};

export default withClickOutside(Select);
