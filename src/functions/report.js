import { requestAPI } from './api';
import { setPage } from '../store/actions/pageLogTaskActions';

function translateHeaderWorkName(data) {
  const translations = {
    newConnection: 'Новое подключение',
    'Equipment shutdown': 'Снятие оборудования',
    malfunction: 'Неисправность',
  };

  return data.map((item) => ({
    ...item,
    headerWorkName: translations[item.headerWorkName] || item.headerWorkName,
    idUserSideCard: item.idUserSideCard === -1 ? '' : item.idUserSideCard,
  }));
}

/**
 * Функция получения отчета по задачам или Wi-Fi логам
 * @param {Object} data - Данные для запроса
 * @param {Function} data.dispatch - Функция диспетчера (из Redux)
 * @param {boolean} data.task - Флаг, определяющий тип запроса (true — задачи, false — Wi-Fi)
 * @param {number} data.activePage - Текущая страница для пагинации
 * @param {string} [data.startDate] - Дата начала фильтрации в формате 'YYYY-MM-DD'
 * @param {string} [data.endDate] - Дата окончания фильтрации в формате 'YYYY-MM-DD'
 * @param {string} [data.selectedUser] - Логин выбранного пользователя
 * @param {string} [data.ponSerial] - Серийный номер PON-устройства
 * @param {string} [data.channel] - Канал для фильтрации Wi-Fi логов
 * @param {string} [data.regionTask] - Идентификатор региона
 * @param {string} [data.workTask] - Тип задачи (например, 'newConnection', 'malfunction')
 * @param {string} [data.loginTask] - Логин пользователя
 * @throws {Error} В случае ошибки при выполнении запроса или обработки данных.
 */

export async function getReport(data) {
  const {
    dispatch,
    task,
    activePage,
    startDate,
    endDate,
    selectedUser,
    ponSerial,
    channel,
    regionTask,
    workTask,
    loginTask,
  } = data;

  let url = null;

  if (task) {
    url = `logs/smallTasks?size=50&page=${activePage - 1}`;

    if (workTask) {
      url += `&workType=${encodeURIComponent(workTask)}`;
    }
  } else {
    url = `logs/smallWifi?size=50&page=${activePage - 1}`;

    if (channel) {
      url += `&channel=${encodeURIComponent(channel)}`;
    }
  }

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate + ' 00:00')}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate + ' 23:59')}`;
  }
  if (selectedUser) {
    url += `&login=${encodeURIComponent(selectedUser)}`;
  }
  if (ponSerial) {
    url += `&ponSerial=${encodeURIComponent(ponSerial)}`;
  }
  if (regionTask) {
    url += `&region=${encodeURIComponent(regionTask)}`;
  }
  if (loginTask) {
    url += `&userSideLogin=${encodeURIComponent(loginTask)}`;
  }

  let info = await requestAPI('GET', url);
  dispatch(setPage(info.totalPages + 1));
  let content = info.content;
  if (task) {
    content = translateHeaderWorkName(content);
  }
  return content;
}

export function getWork() {
  return [
    'Все работы',
    'Новое подключение',
    'Неисправность',
    'Снятие оборудования',
  ];
}

export function setWork(work) {
  switch (work) {
    case 'Новое подключение':
      return 'newConnection';
    case 'Неисправность':
      return 'malfunction';
    case 'Снятие оборудования':
      return 'Equipment shutdown';
    default:
      return null;
  }
}
