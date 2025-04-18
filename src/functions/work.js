import { requestAPI } from './api';
import { useNavigate } from 'react-router-dom';
import {
  setTask,
  setSubtask,
  setAction,
  setWork,
  setRegTask,
  setTransition,
} from '../store/actions/taskActions';
import { setSerial } from '../store/actions/serialActions';

// Функция получения активной задачи
export async function getActiveTask(dispatch, body) {
  try {
    const response = await requestAPI('GET', 'task/findTaskInProcess');
    if (response && response.headerTaskName) {
      dispatch(setTask(response.headerTaskName));
      dispatch(setSubtask(response.lastCompletedTask));
      dispatch(setAction(response.headerTaskCompleted));
      dispatch(setWork(response.headerWorkName));
      dispatch(setRegTask(response.regionId));
      dispatch(setSerial(response.ponSerial));
      dispatch(setTransition(true));
    } else {
      dispatch(setTask(null));
      dispatch(setSubtask(null));
      dispatch(setAction(null));
      dispatch(setWork(null));
      dispatch(setRegTask(null));
      dispatch(setSerial(null));
      dispatch(setTransition(false));
    }
  } catch (error) {
    dispatch(setTask(null));
    dispatch(setSubtask(null));
    dispatch(setAction(null));
    dispatch(setWork(null));
    dispatch(setRegTask(null));
    dispatch(setSerial(null));
    dispatch(setTransition(false));
  }
}

// Функция завершения задачи
export async function closeTask(
  navigate,
  regionFromRedux,
  dispatch,
  closeForm
) {
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
  closeForm
) {
  try {
    if (taskFromRedux.action !== 'NEW') {
      navigate(
        `/${taskFromRedux.action}?region=${taskFromRedux.reg}&work=${taskFromRedux.work}&serial=${serialFromRedux}&task=${taskFromRedux.subtask}`
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
