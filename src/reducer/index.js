import { createSelector } from 'reselect';
import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  countries: [],
  selected: null,
  searchValue: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.SET_COUNTRIES:
      return {
        ...state,
        countries: payload.countries,
      };

    case actionsTypes.SEARCH_COUNTRIES:
      return {
        ...state,
        searchValue: payload.value,
      };

    case actionsTypes.SELECT_COUNTRY:
      return {
        ...state,
        selected: payload.country,
      };

    default:
      return state;
  }
};

const stateSelector = state => state;
export const countriesSelector = createSelector(stateSelector, state => state.countries);
export const searchValueSelector = createSelector(stateSelector, state => state.searchValue);
export const sortedCountriesSelector = createSelector(countriesSelector, countries => {
  return [...countries].sort((a, b) => {
    const textA = a.label.toUpperCase();
    const textB = b.label.toUpperCase();

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
});

export const filteredCountriesSelector = createSelector(
  sortedCountriesSelector,
  searchValueSelector,
  (sortedOptions, searchValue) =>
    sortedOptions.filter(
      option =>
        option.label.toUpperCase().includes(searchValue.toUpperCase()) ||
        option.value.toUpperCase().includes(searchValue.toUpperCase())
    )
);
