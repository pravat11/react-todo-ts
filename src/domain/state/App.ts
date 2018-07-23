import Todo from './Todo';
import UiState from './Ui';
import VisibilityFilter from './visibility-filter';

interface App {
  ui: UiState;
  todos: Todo[];
  visibilityFilter: VisibilityFilter;
}

export default App;
