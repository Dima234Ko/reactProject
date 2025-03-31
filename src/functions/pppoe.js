import { getTaskId, checkTask } from './task';
import { setProgress } from '../store/actions/progressActions';
import { requestAPI } from './api';
import { updateUrlWithParam } from './url';


//Получить информацию из US
export async function searchIdUs(
  userLoginSerial,
  serialFromRedux,
  setResult,
  param,
  page
) {
  setResult(null);
  let body;
  let data;

  try {
    if (param === 'login') {
      body = {
        userLogin: userLoginSerial,
        serialNewNtu: serialFromRedux,
      };
      data = await requestAPI('POST', 'userSide/getUserId', body);

      if (page !== 'wifi') {
        if (data.idUserSideCard !== null) {
          setResult({
            result: 'Найдена учетная запись в US',
            success: false,
          });
        } else {
          setResult({
            result: 'Учетная запись в US отсутствует',
            success: true,
          });
        }
      }
    } else {
      body = {
        serialNewNtu: userLoginSerial,
      };
      data = await requestAPI('POST', 'userSide/getUserId', body);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Функция запроса
export async function setPppoe(
  serial,
  login,
  password,
  workFromRedux,
  setLoading,
  setResult,
  dispatch,
  navigate,
  regionId
) {
  setResult(null);
  dispatch(setProgress(0));

  let body = {
    regionId: regionId,
    serialNewNtu: serial,
    userLogin: login,
    userPassword: password,
  };

  let taskId;
  updateUrlWithParam('login', login, navigate);

  try {
    taskId = await getTaskId(
      `newConnection/setNtuNewPppoe`,
      body,
      dispatch,
      setLoading,
      navigate,
      serial
    );
  } catch (error) {
    throw error;
  }

  try {
    if (taskId) {
      await checkTask(
        `task/taskStatus`,
        taskId,
        dispatch,
        setLoading,
        setResult,
        navigate,
        0,
        80
      );
    } else {
      throw new Error('taskId не был получен');
    }
  } catch (error) {
    throw new Error(`Не удалось получить taskId: ${error.message || error}`);
  }
}
