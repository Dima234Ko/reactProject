import { requestAPI } from './api';

/**
 * Функция записи данных в US
 * @param {Object} data - Данные для запроса статуса
 * @param {string} data.loginFromRedux - Логин абонента
 * @param {string} data.surname - Фамилия абонента
 * @param {string} data.name - Имя абонента
 * @param {Function} data.patronymic - Отчество абонента
 * @param {Function} data.phone - Телефон абонента
 * @param {Function} data.workFromRedux - Выполняемая работа (Redux)
 * @throws {Error} Если не удалось получить taskId или выполнить задачу
 */

export async function setInfoToUs(data) {
  const { loginFromRedux, surname, name, patronymic, phone, workFromRedux } =
    data;

  let body = {
    userLogin: loginFromRedux,
    userFullName: `${surname} ${name} ${patronymic}`,
    userPhone: phone,
  };
  try {
    await requestAPI('POST', `${workFromRedux}/setInfoToUs`, body);
  } catch {
    throw error;
  }
}
