import { SET_COUNTRIES } from './actionTypes';

export interface SetCountriesAction {
  type: typeof SET_COUNTRIES;
  payload: string[];
}

export const setCountries = (countries: string[]): SetCountriesAction => ({
  type: SET_COUNTRIES,
  payload: countries,
});
