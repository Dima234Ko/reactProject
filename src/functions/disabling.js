import { getTaskId, checkTask } from './task';

/**
 * Отключает оборудование NTU через API, отправляя запрос на отключение и отслеживая статус задачи.
 * @param {Object} data - Данные для обработки запроса
 * @param {boolean} data.isChecked - Флаг состояния оборудования (true для неисправности, false для отключения линии)
 * @param {string} [data.selectedRadioOption] - Индекс или ключ выбранной радиокнопки (если isChecked=true)
 * @param {Array<string>} [data.radioOptions] - Массив текстов радиокнопок (если isChecked=true)
 * @param {string} data.serial - Серийный номер оборудования
 * @param {Function} data.dispatch - Функция диспетчера для управления состоянием (например, Redux)
 * @param {Function} data.setLoading - Устанавливает состояние загрузки (true/false)
 * @param {Function} data.setResult - Устанавливает результат операции (например, успех или ошибка)
 * @param {Function} data.navigate - Функция навигации для перенаправления (например, react-router)
 * @returns {Promise<void>} - Промис, который разрешается при успешном выполнении или выбрасывает ошибку
 * @throws {Error} Если не удалось получить taskId или выполнить запрос
 */

export async function disableNTU(data) {
  try {
    let action = `newConnection/equipmentShutdown`;
    let body = getBody(data);
    data.setLoading(true);

    // Получаем taskId
    const taskId = await getTaskId(
      action,
      body,
      data.dispatch,
      data.setLoading,
      data.navigate,
      data.serial
    );

    if (taskId) {
      // Если taskId получен, начинаем отслеживание
      await checkTask(
        `task/taskStatus`,
        taskId,
        data.dispatch,
        data.setLoading,
        data.setResult,
        data.navigate,
        0,
        30
      );
      data.navigate(`/region`);
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}

/**
 * Формирует тело запроса для API на основе данных оборудования.
 * @param {Object} data - Данные для формирования тела запроса
 * @param {boolean} data.isChecked - Флаг состояния оборудования (true для неисправности, false для отключения линии)
 * @param {string} [data.selectedRadioOption] - Индекс или ключ выбранной радиокнопки (если isChecked=true)
 * @param {Array<string>} [data.radioOptions] - Массив текстов радиокнопок (если isChecked=true)
 * @param {string} data.serial - Серийный номер оборудования
 * @returns {Object} Тело запроса, содержащее серийный номер, тип работы и дополнительную информацию
 */

function getBody(data) {
  let checkboxText = '';
  let radioText = '';
  if (data.isChecked) {
    checkboxText = 'Неисправность оборудования';
  } else {
    checkboxText = 'Отключение абонентской линии';
  }

  // Определяем текст выбранной радиокнопки
  if (data.isChecked && data.selectedRadioOption) {
    radioText = data.radioOptions[data.selectedRadioOption];
  } else {
    radioText = '';
  }

  let body = {
    serialNewNtu: data.serial,
    work: checkboxText,
    info: radioText,
  };

  return body;
}
