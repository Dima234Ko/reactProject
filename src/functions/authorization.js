import { requestAPI } from './api';

/**
 * Функция авторизации пользователя
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 */

export async function authorization(login, password) {
  let action = 'login';
  let logPass = {
    login: login,
    password: password,
  };

  let data = await requestAPI('POST', action, logPass);
  return data;
}
