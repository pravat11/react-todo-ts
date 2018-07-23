import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import AppState from '../../../domain/state';
import TodoFormModes from '../../../enum/TodoFormModes';
import { setTodoFormShownStatus } from '../../../actions/todoActions';

interface MappedProps {
  isShowingTodoForm: boolean;
  todoFormMode: TodoFormModes;
}

interface DispatchedProps {
  setTodoFormShownStatus: (show: boolean) => void;
}

type AddNoteModalProps = MappedProps & DispatchedProps;

const AddTodoModal = (props: AddNoteModalProps) => (
  <Modal show={props.isShowingTodoForm} onHide={() => props.setTodoFormShownStatus(false)} backdrop="static">
    {props.todoFormMode === TodoFormModes.EDIT_TODO ? <EditTodoForm /> : <AddTodoForm />}
  </Modal>
);

const mapStateToProps = (state: AppState) => ({
  todoFormMode: state.app.ui.todoFormMode,
  isShowingTodoForm: state.app.ui.isShowingTodoForm
});

const mapDispatchToProps = {
  setTodoFormShownStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoModal);
