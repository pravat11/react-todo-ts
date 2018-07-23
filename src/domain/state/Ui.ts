import TodoFormModes from '../../enum/TodoFormModes';

interface Ui {
  activeFilter: number;
  todoFormMode: TodoFormModes;
  isShowingTodoForm: boolean;
  selectedTodoId: number | null;
  fetchTodos: {
    pending: boolean;
    error: any;
  };
  addTodo: {
    pending: boolean;
    error: any;
  };
  updateTodo: {
    [key: string]: {
      pending: boolean;
      error: any;
    };
  };
  deleteTodo: {
    [key: string]: {
      pending: boolean;
      error: any;
    };
  };
}

export default Ui;
