import { TodoActions } from '../../actions/todoActions';
import { VisibilityFilterActions } from '../../actions/visibilityFilters';

type AppActions = TodoActions | VisibilityFilterActions;

export default AppActions;
