import React, { Component } from 'react';
import classnames from 'classnames';

class SearchInput extends Component {
  searchInputRef = React.createRef();

  getValue = () => {
    const { value, selected, isExpanded } = this.props;

    if (!isExpanded && selected) {
      return selected.label;
    }

    return value;
  };

  inputChangeHandler = e => this.props.onInput(e.target.value);

  toggleMenuHandler = () => {
    const { isExpanded, toggleMenu } = this.props;

    if (isExpanded) {
      toggleMenu();
      this.searchInputRef.current.blur();
    } else {
      toggleMenu();
    }
  };

  render() {
    return (
      <label
        className={classnames('select__label', {
          'select__label--with-text': this.props.value || this.props.selected,
        })}
      >
        <input
          ref={this.searchInputRef}
          onInput={this.inputChangeHandler}
          className="select__input"
          onTouchStart={this.props.toggleNativeSelect}
          type="text"
          onClick={this.toggleMenuHandler}
          value={this.getValue()}
        />
        {!this.props.isExpandedUp && (
          <span className="select__label-text">{this.props.placeholder}</span>
        )}
        <span
          className={classnames('select__arrow', {
            'select__arrow--up': this.props.isExpanded,
            'select__arrow--down': !this.props.isExpanded,
          })}
        />
      </label>
    );
  }
}

export default SearchInput;
