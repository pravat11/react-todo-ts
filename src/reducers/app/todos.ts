import Todo from '../../domain/state/Todo';
import AppActions from '../../domain/action/AppActions';
import {
  ADD_TODO_FULFILLED,
  FETCH_TODOS_FULFILLED,
  REMOVE_TODO_FULFILLED,
  UPDATE_TODO_FULFILLED
} from '../../actions/todoActions';

const INITIAL_STATE: Todo[] = [];

const todos = (state: Todo[] = INITIAL_STATE, action: AppActions) => {
  switch (action.type) {
    case FETCH_TODOS_FULFILLED:
      return action.payload;

    case ADD_TODO_FULFILLED:
      return [...state, action.payload];

    case UPDATE_TODO_FULFILLED:
      return state.map(
        todo =>
          todo.id !== action.payload.id
            ? todo
            : {
                ...todo,
                ...action.payload
              }
      );

    case REMOVE_TODO_FULFILLED:
      return state.filter(todo => {
        return todo.id !== action.meta.id;
      });

    default:
      return state;
  }
};

export default todos;
