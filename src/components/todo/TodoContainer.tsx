import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import TodoTabs from './TodoTabs';
import TodoList from './TodoList';
import TodoModal from './todo-form/TodoModal';
import TodoFormModes from '../../enum/TodoFormModes';
import { getVisibilityFilters } from '../../actions/visibilityFilters';
import TodoFormActionPayload from '../../domain/action/TodoFormActionPayload';
import { fetchTodos, setTodoFormShownStatus } from '../../actions/todoActions';

interface DispatchedProps {
  fetchTodos: () => void;
  getVisibilityFilters: () => void;
  setTodoFormShownStatus: (payload: TodoFormActionPayload) => void;
}

type TodoContainerProps = DispatchedProps;

class TodoContainer extends React.Component<TodoContainerProps, {}> {
  componentDidMount() {
    const fetchTasks = [this.props.fetchTodos(), this.props.getVisibilityFilters()];

    Promise.all(fetchTasks);
  }

  render() {
    return (
      <div className="container">
        <TodoModal />
        <div className="button-wrapper">
          <Button
            bsStyle="primary"
            className="add-button"
            onClick={() => this.props.setTodoFormShownStatus({ show: true, mode: TodoFormModes.ADD_TODO })}
          >
            Add new todo
          </Button>
        </div>
        <TodoTabs />
        <TodoList />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchTodos,
  getVisibilityFilters,
  setTodoFormShownStatus
};

export default connect<{}, DispatchedProps, {}>(
  null,
  mapDispatchToProps
)(TodoContainer);
