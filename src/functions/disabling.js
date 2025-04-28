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
  const {
    serial,
    dispatch,
    setLoading,
    navigate,
    setResult,
    isChecked,
    selectedRadioOption,
    radioOptions,
  } = data;

  try {
    let action = `newConnection/equipmentShutdown`;
    let body = getBody({
      isChecked,
      selectedRadioOption,
      radioOptions,
      serial,
    });
    setLoading(true);

    const taskId = await getTaskId(
      action,
      body,
      dispatch,
      setLoading,
      navigate,
      serial
    );

    if (taskId) {
      await checkTask(
        `task/taskStatus`,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        30
      );
      navigate(`/region`);
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
  const { isChecked, selectedRadioOption, radioOptions, serial } = data;

  let checkboxText = '';
  let radioText = '';
  if (isChecked) {
    checkboxText = 'Неисправность оборудования';
  } else {
    checkboxText = 'Отключение абонентской линии';
  }

  if (isChecked && selectedRadioOption) {
    radioText = radioOptions[selectedRadioOption];
  } else {
    radioText = '';
  }

  let body = {
    serialNewNtu: serial,
    work: checkboxText,
    info: radioText,
  };

  return body;
}
