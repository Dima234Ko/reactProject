import { getTaskId, checkTask } from './task';
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
