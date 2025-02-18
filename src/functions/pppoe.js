import { getTaskId, checkTask } from "./task";
import { setProgress } from "../store/actions/progressActions";
import { requestAPI } from "./api";
import { faL } from "@fortawesome/free-solid-svg-icons";

export async function searchIdUs(
    userLogin,
    setResult
  ){ setResult(null);  
    let body = {
    userLogin: userLogin,
  };
  try {
    const data = await requestAPI("POST", "userSide/getUserId", body);
    if (data.idUserSideCard !== null ){
      setResult({
        result :'Найдена учетная запись в US',
        success: false
        }
      );
    } else {
      setResult({
        result :'Учетная запись в US отсутствует',
        success: true
        }
      );
    } 
  } catch {
    throw new Error(error);
  }
}


// Главная функция для получения статуса
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
  dispatch(setProgress(0)); // Устанавливаем начальный прогресс
  let body = {
    regionId: 1,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  try {
    // Получаем taskId
    const taskId = await getTaskId(
      "setNTU/setNtuNewPppoe",
      body,
      dispatch,
      setLoading,
      navigate,
    );
    if (taskId) {
      // Если taskId получен, начинаем отслеживание статуса
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
    }
  } catch (error) {
    setLoading(false);
    throw new Error(error);
  }
}
