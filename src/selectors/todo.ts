import Todo from '../domain/state/Todo';
import VisibilityFilters from '../enum/VisibilityFilters';

export function getListFromSelectedFilter(todos: Todo[], activeFilter: number) {
  return activeFilter === VisibilityFilters.ACTIVE
    ? todos.filter(todo => !todo.isCompleted)
    : activeFilter === VisibilityFilters.COMPLETED
      ? todos.filter(todo => todo.isCompleted)
      : todos;
}

export function getSelectedTodoDetails(todos: Todo[], todoId: number | null): Todo | null {
  if (!todoId) {
    return null;
  }

  const selectedTodo = todos.find(todo => todo.id === +todoId);

  return selectedTodo || null;
}
