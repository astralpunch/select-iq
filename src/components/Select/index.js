import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isTouchDevice } from './helpers';
import { withClickOutside } from './withClickOutside';
import SearchInput from './SearchInput';
import OptionsList from './OptionsList';

class Select extends Component {
  static defaultProps = {
    options: [],
    onChange: () => {},
    onInput: () => {},
  };

  nativeSelectRef = React.createRef();

  state = {
    isExpanded: false,
    isMenuFlipped: false,
  };

  clickOutsideHandler = () => {
    if (this.state.isExpanded) {
      this.toggleMenu();
    }
  };

  setIsFlipped = isFlipped =>
    this.setState({
      isMenuFlipped: isFlipped,
    });

  toggleMenu = () =>
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));

  selectOptionHandler = option => () => {
    this.props.onChange(option);
    this.toggleMenu();
  };

  nativeSelectValueHandler = e => {
    const { value } = e.target;
    const selectedOption = this.props.options.filter(option => option.value === value)[0];

    this.props.onChange(selectedOption);
  };

  renderInput = () => {
    return (
      <SearchInput
        placeholder={this.props.placeholder}
        onInput={this.props.onInput}
        value={this.props.value}
        selected={this.props.selected}
        isExpanded={this.state.isExpanded}
        toggleMenu={this.toggleMenu}
        isMenuFlipped={this.state.isMenuFlipped}
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
        setIsFlipped={this.setIsFlipped}
        isMenuFlipped={this.state.isMenuFlipped}
      />
    );
  };

  renderNativeSelect = () => (
    <select
      className="native-select"
      onChange={this.nativeSelectValueHandler}
      value={this.props.selected ? this.props.selected.value : ''}
    >
      {this.props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  renderSelect = () => {
    return (
      <div className="select">
        {this.renderInput()}
        {isTouchDevice() ? this.renderNativeSelect() : this.renderOptions()}
      </div>
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
