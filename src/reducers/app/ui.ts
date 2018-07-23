import UiState from '../../domain/state/Ui';
import TodoFormModes from '../../enum/TodoFormModes';
import AppActions from '../../domain/action/AppActions';
import VisibilityFilters from '../../enum/VisibilityFilters';

import {
  ADD_TODO_PENDING,
  ADD_TODO_REJECTED,
  SET_SELECTED_TODO,
  ADD_TODO_FULFILLED,
  FETCH_TODOS_PENDING,
  REMOVE_TODO_PENDING,
  UPDATE_TODO_PENDING,
  FETCH_TODOS_REJECTED,
  UPDATE_TODO_REJECTED,
  REMOVE_TODO_REJECTED,
  FETCH_TODOS_FULFILLED,
  UPDATE_TODO_FULFILLED,
  REMOVE_TODO_FULFILLED,
  SET_TODO_FORM_SHOWN_STATUS
} from '../../actions/todoActions';
import { SET_VISIBILITY_FILTER } from '../../actions/visibilityFilters';

const INITIAL_STATE: UiState = {
  isShowingTodoForm: false,
  selectedTodoId: null,
  todoFormMode: TodoFormModes.ADD_TODO,
  activeFilter: VisibilityFilters.ALL,
  fetchTodos: {
    pending: false,
    error: null
  },
  addTodo: {
    pending: false,
    error: null
  },
  updateTodo: {},
  deleteTodo: {}
};

const todos = (state: UiState = INITIAL_STATE, action: AppActions): UiState => {
  switch (action.type) {
    case SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodoId: action.payload
      };

    case SET_TODO_FORM_SHOWN_STATUS:
      return {
        ...state,
        isShowingTodoForm: action.payload.show,
        todoFormMode: action.payload.mode
      };

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        activeFilter: action.payload
      };

    case ADD_TODO_PENDING:
      return {
        ...state,
        addTodo: {
          ...state.addTodo,
          pending: true
        }
      };

    case ADD_TODO_REJECTED:
      return {
        ...state,
        addTodo: {
          pending: false,
          error: action.payload.response.data
        }
      };

    case ADD_TODO_FULFILLED:
      return {
        ...state,
        addTodo: {
          error: null,
          pending: false
        }
      };

    case FETCH_TODOS_PENDING:
      return {
        ...state,
        fetchTodos: {
          error: null,
          pending: true
        }
      };

    case FETCH_TODOS_REJECTED:
      return {
        ...state,
        fetchTodos: {
          error: null,
          pending: false
        }
      };

    case FETCH_TODOS_FULFILLED:
      return {
        ...state,
        fetchTodos: {
          error: null,
          pending: false
        }
      };

    case UPDATE_TODO_PENDING:
      return {
        ...state,
        updateTodo: {
          ...state.updateTodo,
          [action.meta.id]: {
            ...state.updateTodo[action.meta.id],
            pending: true
          }
        }
      };

    case UPDATE_TODO_REJECTED:
      return {
        ...state,
        updateTodo: {
          ...state.updateTodo,
          [action.meta.id]: {
            pending: false,
            error: action.payload.response.data
          }
        }
      };

    case UPDATE_TODO_FULFILLED:
      return {
        ...state,
        updateTodo: {
          ...state.updateTodo,
          [action.meta.id]: {
            error: null,
            pending: false
          }
        }
      };

    case REMOVE_TODO_PENDING:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          [action.meta.id]: {
            ...state.deleteTodo[action.meta.id],
            pending: true
          }
        }
      };

    case REMOVE_TODO_REJECTED:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          [action.meta.id]: {
            pending: false,
            error: action.payload.response.data
          }
        }
      };

    case REMOVE_TODO_FULFILLED:
      return {
        ...state,
        deleteTodo: {
          ...state.deleteTodo,
          [action.meta.id]: {
            error: null,
            pending: false
          }
        }
      };

    default:
      return state;
  }
};

export default todos;
