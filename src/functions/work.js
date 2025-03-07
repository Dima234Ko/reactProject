import { requestAPI } from "./api";
import { useNavigate } from "react-router-dom";
import { setTask } from "../store/actions/taskActions";

// Функция получения активной задачи
export async function getActiveTask(dispatch) {
  try {
    const response = await requestAPI("GET", "task/findTaskInProcess");
    if (response && response.headerTaskName) {
      dispatch(setTask(response.headerTaskName));
    } else {
      dispatch(setTask(null));
    }
    return null;
  } catch (error) {
    dispatch(setTask(null));
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
