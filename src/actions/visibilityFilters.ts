import { createAction } from 'redux-actions';

import * as visibilityFilterService from '../services/visibilityFilters';
import { Action, ActionWithPayload, ActionWithError } from '../domain/action/base';
import VisibilityFilters from '../domain/state/visibility-filter/VisibilityFilters';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export type SET_VISIBILITY_FILTER = typeof SET_VISIBILITY_FILTER;

export const GET_VISIBILITY_FILTERS = 'GET_VISIBILITY_FILTERS';
export type GET_VISIBILITY_FILTERS = typeof GET_VISIBILITY_FILTERS;

export const GET_VISIBILITY_FILTERS_PENDING = 'GET_VISIBILITY_FILTERS_PENDING';
export type GET_VISIBILITY_FILTERS_PENDING = typeof GET_VISIBILITY_FILTERS_PENDING;

export const GET_VISIBILITY_FILTERS_REJECTED = 'GET_VISIBILITY_FILTERS_REJECTED';
export type GET_VISIBILITY_FILTERS_REJECTED = typeof GET_VISIBILITY_FILTERS_REJECTED;

export const GET_VISIBILITY_FILTERS_FULFILLED = 'GET_VISIBILITY_FILTERS_FULFILLED';
export type GET_VISIBILITY_FILTERS_FULFILLED = typeof GET_VISIBILITY_FILTERS_FULFILLED;

export type GetVisibilityFiltersPending = Action<GET_VISIBILITY_FILTERS_PENDING>;
export type GetVisibilityFiltersRejected = ActionWithError<GET_VISIBILITY_FILTERS_REJECTED, any>;
export type GetVisibilityFiltersFulfilled = ActionWithPayload<GET_VISIBILITY_FILTERS_FULFILLED, VisibilityFilters>;

export type SetVisibilityFilterAction = ActionWithPayload<SET_VISIBILITY_FILTER, number>;
export type GetVisibilityFiltersAction =
  | GetVisibilityFiltersPending
  | GetVisibilityFiltersRejected
  | GetVisibilityFiltersFulfilled;

export type VisibilityFilterActions = SetVisibilityFilterAction | GetVisibilityFiltersAction;

export const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER);
export const getVisibilityFilters = createAction(GET_VISIBILITY_FILTERS, visibilityFilterService.getVisibilityFilters);
