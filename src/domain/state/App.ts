import Todo from './Todo';
import UiState from './Ui';
import SessionState from './session';
import VisibilityFilter from './visibility-filter';

interface App {
  ui: UiState;
  todos: Todo[];
  session: SessionState;
  visibilityFilter: VisibilityFilter;
}

export default App;
