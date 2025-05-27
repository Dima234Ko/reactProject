import { requestAPI } from './api';
import {
  setTask,
  setSubtask,
  setAction,
  setWork,
  setRegTask,
  setTransition,
} from '../store/actions/taskActions';
import { setSerial } from '../store/actions/serialActions';
import { setLogin } from '../store/actions/loginActions';
import { setIp } from '../store/actions/ipActions';

/**
 * Функция получения активной задачи
 * @param {Function} data.dispatch - Функция диспетчера (из Redux)
 */

export async function getActiveTask(dispatch) {
  try {
    const response = await requestAPI('GET', 'task/findTaskInProcess');
    if (response && response.headerTaskName) {
      dispatch(setTask(response.headerTaskName));
      dispatch(setSubtask(response.lastCompletedTask));
      dispatch(setAction(response.headerTaskCompleted));
      dispatch(setWork(response.headerWorkName));
      dispatch(setRegTask(response.regionId));
      dispatch(setSerial(response.ponSerial));
      dispatch(setLogin(response.aksLogin));
      dispatch(setTransition(true));
    } else {
      dispatch(setTask(null));
      dispatch(setSubtask(null));
      dispatch(setAction(null));
      dispatch(setWork(null));
      dispatch(setRegTask(null));
      dispatch(setSerial(null));
      dispatch(setLogin(null));
      dispatch(setIp(null));
      dispatch(setTransition(false));
    }
  } catch (error) {
    dispatch(setTask(null));
    dispatch(setSubtask(null));
    dispatch(setAction(null));
    dispatch(setWork(null));
    dispatch(setRegTask(null));
    dispatch(setSerial(null));
    dispatch(setLogin(null));
    dispatch(setIp(null));
    dispatch(setTransition(false));
  }
}

/**
 * Функция завершения активной задачи
 * @param {Function} data.dispatch - Функция диспетчера (из Redux)
 * @param {Function} data.navigate - Функция навигации (react-router)
 * @param {Function} data.regionFromRedux - Идентификатор региона (из Redux)
 * @param {Function} data.closeForm - Функция закрытия формы
 */

export async function closeTask(data) {
  const { navigate, regionFromRedux, dispatch, closeForm } = data;

  try {
    const task = await requestAPI('GET', 'task/closedTask');
    dispatch(setTask(null));
    dispatch(setSubtask(null));
    dispatch(setAction(null));
    dispatch(setWork(null));
    dispatch(setRegTask(null));
    dispatch(setSerial(null));
    dispatch(setTransition(false));
    navigate(`/work?region=${regionFromRedux}`);
    closeForm();
  } catch (error) {
    console.error(error);
  }
}

// Функция открытия задачи
export async function openTask(
  navigate,
  taskFromRedux,
  serialFromRedux,
  loginFromRedux,
  closeForm
) {
  try {
    if (taskFromRedux.action !== 'NEW') {
      navigate(
        `/${taskFromRedux.action}?region=${taskFromRedux.reg}&work=${taskFromRedux.work}&serial=${serialFromRedux}${
          loginFromRedux ? `&login=${loginFromRedux}` : ''
        }${taskFromRedux.subtask ? `&task=${taskFromRedux.subtask}` : ''}`
      );
    } else if (taskFromRedux.work === 'Equipment shutdown') {
      navigate(
        `/disable?region=${taskFromRedux.reg}&work=${taskFromRedux.work}`
      );
    } else {
      navigate(
        `/status?region=${taskFromRedux.reg}&work=${taskFromRedux.work}`
      );
    }
    closeForm();
  } catch (error) {
    console.error(error);
  }
}

// Функция для создания нового подключения
export async function connection(method, action, regionId, setLoading) {
  setLoading(true);
  let body = {
    regionId: regionId,
  };
  try {
    const data = await requestAPI(method, action, body);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    throw error;
  }
}
