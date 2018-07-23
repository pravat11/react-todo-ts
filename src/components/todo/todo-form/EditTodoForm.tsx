import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormControl } from 'react-bootstrap';

import AppState from '../../../domain/state';
import Todo from '../../../domain/state/Todo';
import TodoFormModes from '../../../enum/TodoFormModes';
import { getSelectedTodoDetails } from '../../../selectors/todo';
import UpdateTodoPayload from '../../../domain/action/UpdateTodoPayload';
import TodoFormActionPayload from '../../../domain/action/TodoFormActionPayload';
import { updateTodo, setTodoFormShownStatus } from '../../../actions/todoActions';

interface DispatchedProps {
  updateTodo: (id: number, payload: UpdateTodoPayload) => void;
  setTodoFormShownStatus: (payload: TodoFormActionPayload) => void;
}

interface MappedProps {
  selectedTodo: Todo | null;
}

interface State {
  todo: string;
}

type TodoFormProps = MappedProps & DispatchedProps;

let inputEl: any;

class EditTodoForm extends React.Component<TodoFormProps, State> {
  constructor(props: TodoFormProps) {
    super(props);

    this.state = {
      todo: ''
    };
  }

  componentDidMount() {
    const { selectedTodo } = this.props;

    if (selectedTodo) {
      this.setState({ todo: selectedTodo.text });

      return;
    }

    this.props.setTodoFormShownStatus({ mode: TodoFormModes.EDIT_TODO, show: false });
  }

  handleTodoUpdate = () => {
    const { selectedTodo } = this.props;

    if (!selectedTodo) {
      return;
    }

    this.props.updateTodo(selectedTodo.id, {
      text: this.state.todo
    });

    this.props.setTodoFormShownStatus({ mode: TodoFormModes.EDIT_TODO, show: false });
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Edit todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            componentClass="textarea"
            placeholder="Enter todo here"
            value={this.state.todo}
            inputRef={el => (inputEl = el)}
            onChange={() => this.setState({ todo: inputEl.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleTodoUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: TodoFormProps) => ({
  selectedTodo: getSelectedTodoDetails(state.app.todos, state.app.ui.selectedTodoId)
});

const mapDispatchToProps = {
  updateTodo,
  setTodoFormShownStatus
};

export default connect<MappedProps, DispatchedProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(EditTodoForm);
