import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormControl } from 'react-bootstrap';

import AppState from '../../../domain/state';
import TodoFormModes from '../../../enum/TodoFormModes';
import { addTodo, setTodoFormShownStatus } from '../../../actions/todoActions';
import TodoFormActionPayload from '../../../domain/action/TodoFormActionPayload';

interface MappedProps {
  isAddingTodo: boolean;
}

interface DispatchedProps {
  addTodo: (todo: string) => void;
  setTodoFormShownStatus: (payload: TodoFormActionPayload) => void;
}

interface State {
  todo: string;
}

type TodoFormProps = MappedProps & DispatchedProps;

let inputEl: any;

class AddTodoForm extends React.Component<TodoFormProps, State> {
  constructor(props: TodoFormProps) {
    super(props);

    this.state = {
      todo: ''
    };
  }

  handleTodoAddAction = async () => {
    await this.props.addTodo(this.state.todo);
    this.props.setTodoFormShownStatus({ mode: TodoFormModes.ADD_TODO, show: false });
  };

  handleTextFieldChange = () => {
    this.setState({ todo: inputEl.value });
  };

  render() {
    const { isAddingTodo } = this.props;

    return (
      <React.Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Add a new todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={this.state.todo}
            componentClass="textarea"
            placeholder="Enter todo here"
            inputRef={el => (inputEl = el)}
            onChange={() => this.setState({ todo: inputEl.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" disabled={isAddingTodo} onClick={() => !isAddingTodo && this.handleTodoAddAction()}>
            Add
          </Button>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isAddingTodo: state.app.ui.addTodo.pending
});

const mapDispatchToProps = {
  addTodo,
  setTodoFormShownStatus
};

export default connect<MappedProps, DispatchedProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoForm);
