import * as React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';

import TextTruncate from './TextTruncate';
import Todo from '../../domain/state/Todo';
import TodoFormModes from '../../enum/TodoFormModes';
import UpdateTodoPayload from '../../domain/action/UpdateTodoPayload';
import TodoFormActionPayload from '../../domain/action/TodoFormActionPayload';
import { removeTodo, updateTodo, setSelectedTodo, setTodoFormShownStatus } from '../../actions/todoActions';

interface TodoListItemProps {
  todo: Todo;
}

interface DispatchedProps {
  removeTodo: (id: number) => void;
  setSelectedTodo: (id: number) => void;
  updateTodo: (id: number, payload: UpdateTodoPayload) => void;
  setTodoFormShownStatus: (payload: TodoFormActionPayload) => void;
}

type ComponentProps = TodoListItemProps & DispatchedProps;

class TodoListItem extends React.Component<ComponentProps, {}> {
  toggleTodoCompletionStatus = async () => {
    const { id, isCompleted } = this.props.todo;

    this.props.updateTodo(id, {
      isCompleted: !isCompleted
    });
  };

  render() {
    const {
      todo: { id, text, isCompleted }
    } = this.props;

    return (
      <li key={`todo-item-${id}`} className="todo-list">
        <label className="checkbox-label">
          <input type="checkbox" checked={isCompleted} onChange={this.toggleTodoCompletionStatus} />
          <span className="checkmark" />
        </label>
        <div className="todo-content-wrapper">
          <span
            className={'todo-text ' + (isCompleted ? 'strike-text' : '')}
            onClick={() => {
              this.props.setSelectedTodo(id);
              this.props.setTodoFormShownStatus({ show: true, mode: TodoFormModes.EDIT_TODO });
            }}
          >
            <TextTruncate line={1} text={text} />
          </span>
        </div>
        <Glyphicon
          glyph="glyphicon glyphicon-remove"
          title="Delete task"
          className="remove-button"
          onClick={() => this.props.removeTodo(id)}
        />
      </li>
    );
  }
}

const mapDispatchToProps = {
  removeTodo,
  updateTodo,
  setSelectedTodo,
  setTodoFormShownStatus
};

export default connect<{}, DispatchedProps, TodoListItemProps>(
  null,
  mapDispatchToProps
)(TodoListItem);
