import * as React from 'react';
import { connect } from 'react-redux';

import Spinner from '../Spinner';
import TodoListItem from './TodoListItem';
import AppState from '../../domain/state';
import Todo from '../../domain/state/Todo';
import VisibilityFilters from '../../enum/VisibilityFilters';
import { getListFromSelectedFilter } from '../../selectors/todo';

interface MappedProps {
  todos: Todo[];
  activeFilter: number;
  isFetchingTodos: boolean;
}

const VisibilityFilterToEmptyStateMap = {
  [VisibilityFilters.ALL]: 'No todos available',
  [VisibilityFilters.ACTIVE]: 'No active todos',
  [VisibilityFilters.COMPLETED]: 'No completed todos'
};

const TodoList = (props: MappedProps) => {
  const { activeFilter, todos, isFetchingTodos } = props;
  const text = VisibilityFilterToEmptyStateMap[activeFilter];
  const showEmptyState = !todos.length && !isFetchingTodos;

  return (
    <div>
      <ul className="todo-list-ul">
        {showEmptyState && <li className="todo-list empty-list">{text}</li>}
        {isFetchingTodos ? (
          <li className="todo-list spinner-wrapper">
            <Spinner />
          </li>
        ) : (
          todos.map(todo => <TodoListItem key={todo.id} todo={todo} />)
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeFilter: state.app.ui.activeFilter,
  isFetchingTodos: state.app.ui.fetchTodos.pending,
  todos: getListFromSelectedFilter(state.app.todos, state.app.ui.activeFilter)
});

export default connect<MappedProps, {}, {}>(mapStateToProps)(TodoList);
