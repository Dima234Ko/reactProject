import { requestAPI } from "./api";
import { useNavigate } from "react-router-dom";
import { setTask, setSubtask, setAction, setWork, setRegion } from "../store/actions/taskActions";
import { setSerial } from "../store/actions/serialActions";


// Функция получения активной задачи
export async function getActiveTask(dispatch, body) {
  try {
    const response = await requestAPI("GET", "task/findTaskInProcess");
    if (response && response.headerTaskName) {
      dispatch(setTask(response.headerTaskName));
      dispatch(setSubtask(response.lastCompletedTask));
      dispatch(setAction(response.headerTaskCompleted));
      dispatch(setWork(response.headerWorkName));
      dispatch(setRegion(response.regionId));
      dispatch(setSerial("HWTCA64157D0"))
    } else {
      dispatch(setTask(null));
      dispatch(setSubtask(null));
      dispatch(setAction(null));
      dispatch(setWork(null));
      dispatch(setRegion(null));
      dispatch(setSerial(null))
    }
  } catch (error) {
    dispatch(setTask(null));
    dispatch(setSubtask(null));
    dispatch(setAction(null));
    dispatch(setWork(null));
    dispatch(setRegion(null));
    dispatch(setSerial(null))
  }
}

// Функция завершения задачи
export async function closeTask(navigate, regionFromRedux, dispatch) {
  try {
    const task = await requestAPI("GET", "task/closedTask");
    navigate(`/work?region=${regionFromRedux}`);
    dispatch(setTask(null));
  } catch (error) {
    console.error(error);
  }
}

// Функция открытия задачи
export async function openTask(navigate, taskFromRedux, serialFromRedux) {
  try {
    navigate(`/${taskFromRedux.action}?region=${taskFromRedux.reg}&work=${taskFromRedux.work}&serial=${serialFromRedux}&task=${taskFromRedux.subtask}`);
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
