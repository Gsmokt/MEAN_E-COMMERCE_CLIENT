import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  USERS_FEATURE_KEY,
  UsersState,
  UsersPartialState,
} from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<
  UsersPartialState,
  UsersState
>(USERS_FEATURE_KEY);

export const getUser = createSelector(getUsersState, (state) => {
  return state.user;
});
export const getUserIsAuth = createSelector(getUsersState, (state) => {
  return state.isAuthenticated;
});
