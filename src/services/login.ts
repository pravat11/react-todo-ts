import config from '../config';
import http from '../utils/http';
import { LoginResponse } from '../domain/state/session';
import LoginPayload from '../domain/action/LoginPayload';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await http.post(config.apis.login, payload);

  return data.data;
}
