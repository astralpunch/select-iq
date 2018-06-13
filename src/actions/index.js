import * as actionsTypes from '../actions/actionsTypes';

export const setCountries = countries => ({
  type: actionsTypes.SET_COUNTRIES,
  payload: { countries },
});

export const searchCountries = value => ({
  type: actionsTypes.SEARCH_COUNTRIES,
  payload: { value },
});

export const selectCountry = country => ({
  type: actionsTypes.SELECT_COUNTRY,
  payload: { country },
});
