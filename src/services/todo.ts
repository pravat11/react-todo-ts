import config from '../config';
import http from '../utils/http';
import Todo from '../domain/state/Todo';
import { interpolate } from '../utils/string';
import VisibilityFilters from '../enum/VisibilityFilters';
import UpdateTodoPayload from '../domain/action/UpdateTodoPayload';

export const visibilityFilterIdToNameMap = {
  [VisibilityFilters.ALL]: 'all',
  [VisibilityFilters.ACTIVE]: 'active',
  [VisibilityFilters.COMPLETED]: 'completed'
};

export async function getAllTodos(filterId: VisibilityFilters = VisibilityFilters.ALL): Promise<Todo[]> {
  const filter = visibilityFilterIdToNameMap[filterId];
  const { data } = await http.get(`${config.apis.fetchAllTodos}?filter=${filter}`);

  return data.data;
}

export async function getTodo(todoId: number): Promise<Todo> {
  const url = interpolate(config.apis.individualTodo, { id: todoId });
  const { data } = await http.get(url);

  return data.data;
}

export async function createTodo(text: string): Promise<Todo> {
  const { data } = await http.post(config.apis.createTodo, { text });

  return data.data;
}

export async function updateTodo(todoId: number, payload: UpdateTodoPayload): Promise<Todo> {
  const url = interpolate(config.apis.individualTodo, { id: todoId });
  const { data } = await http.put(url, payload);

  return data.data;
}

export async function deleteTodo(todoId: number): Promise<{ id: number }> {
  const url = interpolate(config.apis.individualTodo, { id: todoId });

  await http.delete(url);

  return { id: todoId };
}
