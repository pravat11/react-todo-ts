import { createAction } from 'redux-actions';

import Todo from '../domain/state/Todo';
import * as todosService from '../services/todo';
import TodoFormActionPayload from '../domain/action/TodoFormActionPayload';
import { Action, ActionWithError, ActionWithPayload } from '../domain/action/base';

interface TodoMetadata {
  id: number;
}

export const ADD_TODO = 'ADD_TODO';
export type ADD_TODO = typeof ADD_TODO;

export const ADD_TODO_PENDING = 'ADD_TODO_PENDING';
export type ADD_TODO_PENDING = typeof ADD_TODO_PENDING;

export const ADD_TODO_REJECTED = 'ADD_TODO_REJECTED';
export type ADD_TODO_REJECTED = typeof ADD_TODO_REJECTED;

export const ADD_TODO_FULFILLED = 'ADD_TODO_FULFILLED';
export type ADD_TODO_FULFILLED = typeof ADD_TODO_FULFILLED;

export const FETCH_TODOS = 'FETCH_TODOS';
export type FETCH_TODOS = typeof FETCH_TODOS;

export const FETCH_TODOS_PENDING = 'FETCH_TODOS_PENDING';
export type FETCH_TODOS_PENDING = typeof FETCH_TODOS_PENDING;

export const FETCH_TODOS_REJECTED = 'FETCH_TODOS_REJECTED';
export type FETCH_TODOS_REJECTED = typeof FETCH_TODOS_REJECTED;

export const FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED';
export type FETCH_TODOS_FULFILLED = typeof FETCH_TODOS_FULFILLED;

export const REMOVE_TODO = 'REMOVE_TODO';
export type REMOVE_TODO = typeof REMOVE_TODO;

export const REMOVE_TODO_PENDING = 'REMOVE_TODO_PENDING';
export type REMOVE_TODO_PENDING = typeof REMOVE_TODO_PENDING;

export const REMOVE_TODO_REJECTED = 'REMOVE_TODO_REJECTED';
export type REMOVE_TODO_REJECTED = typeof REMOVE_TODO_REJECTED;

export const REMOVE_TODO_FULFILLED = 'REMOVE_TODO_FULFILLED';
export type REMOVE_TODO_FULFILLED = typeof REMOVE_TODO_FULFILLED;

export const UPDATE_TODO = 'UPDATE_TODO';
export type UPDATE_TODO = typeof UPDATE_TODO;

export const UPDATE_TODO_PENDING = 'UPDATE_TODO_PENDING';
export type UPDATE_TODO_PENDING = typeof UPDATE_TODO_PENDING;

export const UPDATE_TODO_REJECTED = 'UPDATE_TODO_REJECTED';
export type UPDATE_TODO_REJECTED = typeof UPDATE_TODO_REJECTED;

export const UPDATE_TODO_FULFILLED = 'UPDATE_TODO_FULFILLED';
export type UPDATE_TODO_FULFILLED = typeof UPDATE_TODO_FULFILLED;

export const SET_SELECTED_TODO = 'SET_SELECTED_TODO';
export type SET_SELECTED_TODO = typeof SET_SELECTED_TODO;

export const SET_TODO_FORM_SHOWN_STATUS = 'SET_TODO_FORM_SHOWN_STATUS';
export type SET_TODO_FORM_SHOWN_STATUS = typeof SET_TODO_FORM_SHOWN_STATUS;

export type AddTodoPendingAction = Action<ADD_TODO_PENDING>;
export type AddTodoRejectedAction = ActionWithError<ADD_TODO_REJECTED, any>;
export type AddTodoFulfilledAction = ActionWithPayload<ADD_TODO_FULFILLED, Todo>;

export type FetchTodosPendingAction = Action<FETCH_TODOS_PENDING>;
export type FetchTodosRejectedAction = ActionWithError<FETCH_TODOS_REJECTED, any>;
export type FetchTodosFulfilledAction = ActionWithPayload<FETCH_TODOS_FULFILLED, Todo[]>;

export type UpdateTodoPendingAction = Action<UPDATE_TODO_PENDING, TodoMetadata>;
export type UpdateTodoRejectedAction = ActionWithError<UPDATE_TODO_REJECTED, any, TodoMetadata>;
export type UpdateTodoFulfilledAction = ActionWithPayload<UPDATE_TODO_FULFILLED, Todo, TodoMetadata>;

export type RemoveTodoPendingAction = Action<REMOVE_TODO_PENDING, TodoMetadata>;
export type RemoveTodoRejectedAction = ActionWithError<REMOVE_TODO_REJECTED, any, TodoMetadata>;
export type RemoveTodoFulfilledAction = ActionWithPayload<REMOVE_TODO_FULFILLED, { id: number }, TodoMetadata>;

export type AddTodoActions = AddTodoPendingAction | AddTodoRejectedAction | AddTodoFulfilledAction;
export type FetchTodosActions = FetchTodosPendingAction | FetchTodosRejectedAction | FetchTodosFulfilledAction;
export type RemoveTodoActions = RemoveTodoPendingAction | RemoveTodoRejectedAction | RemoveTodoFulfilledAction;
export type UpdateTodoActions = UpdateTodoPendingAction | UpdateTodoRejectedAction | UpdateTodoFulfilledAction;

export type SetSelectedTodoAction = ActionWithPayload<SET_SELECTED_TODO, number>;
export type SetTodoFormShownStatusAction = ActionWithPayload<SET_TODO_FORM_SHOWN_STATUS, TodoFormActionPayload>;

export type TodoActions =
  | AddTodoActions
  | FetchTodosActions
  | UpdateTodoActions
  | RemoveTodoActions
  | SetSelectedTodoAction
  | SetTodoFormShownStatusAction;

export const setSelectedTodo = createAction(SET_SELECTED_TODO);
export const addTodo = createAction(ADD_TODO, todosService.createTodo);
export const removeTodo = createAction(REMOVE_TODO, todosService.deleteTodo, id => ({
  id
}));
export const updateTodo = createAction(UPDATE_TODO, todosService.updateTodo, (id, payload) => ({
  id
}));
export const fetchTodos = createAction(FETCH_TODOS, todosService.getAllTodos);
export const setTodoFormShownStatus = createAction(SET_TODO_FORM_SHOWN_STATUS);
