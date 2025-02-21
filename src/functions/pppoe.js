import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";
import { requestAPI } from "./api";

//Получить информацию из US
export async function searchIdUs(userLoginSerial, setResult, param) {
  setResult(null);
  let body;
  if (param === "login")
    body = {
      userLogin: userLoginSerial,
    };
  else {
    body = {
      serialNewNtu: userLoginSerial,
    };
  }
  try {
    const data = await requestAPI("POST", "userSide/getUserId", body);
    if (data.idUserSideCard !== null) {
      setResult({
        result: "Найдена учетная запись в US",
        success: true,
      });
    } else {
      setResult({
        result: "Учетная запись в US отсутствует",
        success: false,
      });
    }
    return data;
  } catch {
    throw error;
  }
}

//Записать данные в ЮС
export async function setInfoToUs(userLogin, surname, name, patronymic, phone) {
  let body = {
    userLogin: userLogin,
    userFullName: `${surname} ${name} ${patronymic}`,
    userPhone: phone,
  };
  try {
    await requestAPI("POST", "userSide/setInfoToUs", body);
  } catch {
    throw error;
  }
}

// Функция запроса
export async function setPppoe(
  serial,
  login,
  password,
  setLoading,
  setResult,
  dispatch,
  navigate,
) {
  setLoading(true);
  setResult(null);
  dispatch(setProgress(0));

  let body = {
    regionId: 1,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  let taskId;

  try {
    taskId = await getTaskId(
      "setNTU/setNtuNewPppoe",
      body,
      dispatch,
      setLoading,
      navigate,
    );
  } catch (error) {
    throw error;
  }

  try {
    if (taskId) {
      await checkTask(
        "setNTU/taskStatus",
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        80,
      );
    } else {
      throw new Error("taskId не был получен");
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}
