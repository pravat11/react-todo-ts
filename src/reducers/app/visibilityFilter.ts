import AppActions from '../../domain/action/AppActions';
import VisibilityFilterState from '../../domain/state/visibility-filter';
import { GET_VISIBILITY_FILTERS_FULFILLED } from '../../actions/visibilityFilters';

const INITIAL_STATE: VisibilityFilterState = {
  filters: []
};

const visibilityFilter = (state: VisibilityFilterState = INITIAL_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_VISIBILITY_FILTERS_FULFILLED:
      return {
        ...state,
        filters: action.payload
      };

    default:
      return state;
  }
};

export default visibilityFilter;
