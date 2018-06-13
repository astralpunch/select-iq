import React, { Component } from 'react';
import { connect } from 'react-redux';
import { countries } from '../fixtures';

import Select from './Select';

import { filteredCountriesSelector } from '../reducer';
import { searchCountries, setCountries, selectCountry } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.setCountries(countries);
  }

  render() {
    return (
      <div className="container">
        <Select
          options={this.props.filteredCountries}
          value={this.props.searchValue}
          selected={this.props.selected}
          onChange={this.props.selectCountry}
          onInput={this.props.searchCountries}
          placeholder="Выберите страну"
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    filteredCountries: filteredCountriesSelector(state),
    selected: state.selected,
    searchValue: state.searchValue,
  }),
  {
    setCountries,
    searchCountries,
    selectCountry,
  }
)(App);
