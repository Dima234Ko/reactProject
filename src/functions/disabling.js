import { getTaskId, checkTask } from "./task";
export async function disableNTU(
  isChecked,
  selectedRadioOption,
  radioOptions,
  serial,
  navigate,
  dispatch,
  setResult,
  setLoading,
) {
  try {
    let action = `newConnection/equipmentShutdown`;
    let body = getBody(isChecked, selectedRadioOption, radioOptions, serial);
    setLoading(true);

    // Получаем taskId
    const taskId = await getTaskId(
      action,
      body,
      dispatch,
      setLoading,
      navigate,
      serial,
    );

    if (taskId) {
      // Если taskId получен, начинаем отслеживание
      await checkTask(
        `task/taskStatus`,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        30,
      );
      navigate(`/region`);
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}

function getBody(isChecked, selectedRadioOption, radioOptions, serial) {
  let checkboxText = "";
  let radioText = "";
  if (isChecked) {
    checkboxText = "Неисправность оборудования";
  } else {
    checkboxText = "Отключение абонентской линии";
  }

  // Определяем текст выбранной радиокнопки
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
