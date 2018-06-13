import React from 'react';
import { mount } from 'enzyme';
import Select from '../index';

const options = [{ label: 'Sweden', value: 'SE' }, { label: 'Japan', value: 'JP' }];

describe('Search select tests', () => {
  it('renders search field', () => {
    const component = mount(<Select placeholder="Выберите страну" options={options} />);

    expect(component.find('.select__input').length).toEqual(1);
  });

  it('opens options on focus', () => {
    const component = mount(<Select placeholder="Выберите страну" options={options} />);

    component.find('.select__input').simulate('focus');

    expect(component.find('.select__menu').length).toEqual(1);
  });

  it('saves value on focus', () => {
    const component = mount(
      <Select placeholder="Выберите страну" options={options} value="Japan" />
    );

    expect(component.find('.select__input').props().value).toEqual('Japan');

    component.find('.select__input').simulate('focus');

    expect(component.find('.select__input').props().value).toEqual('Japan');
  });
});
