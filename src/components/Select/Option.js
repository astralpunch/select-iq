import React from 'react';
import classnames from 'classnames';

const formatLabel = (value, label) => {
  const regex = new RegExp(value, 'gi');

  if (!value) {
    return label;
  }

  return label.split(regex).reduce((acc, elem, index) => {
    if (!index) {
      return [elem];
    }

    return acc.concat(
      <span className="select__highlighted-text" key={value + elem}>
        {value}
      </span>,
      elem
    );
  }, []);
};

const Option = props => {
  return (
    <li
      className={classnames('select__option', {
        'select__option--selected': props.selected && props.option.value === props.selected.value,
      })}
      onClick={props.selectOption(props.option)}
    >
      {formatLabel(props.value, props.option.label)}
    </li>
  );
};

export default Option;
