import { LoginActions } from '../../actions/login';
import { TodoActions } from '../../actions/todoActions';
import { VisibilityFilterActions } from '../../actions/visibilityFilters';

type AppActions = TodoActions | LoginActions | VisibilityFilterActions;

export default AppActions;
