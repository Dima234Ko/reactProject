import { requestAPI } from './api';

export async function getAllUsers() {
  let data = await requestAPI('GET', 'ADMIN/getAllUsers');
  return data;
}

export async function getLogins() {
  let usersArray = await getAllUsers();
  return usersArray.map((user) => user.login);
}
