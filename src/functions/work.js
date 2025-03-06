import { requestAPI } from "./api";
import { useNavigate } from "react-router-dom";

// Функция получения активной задачи
export async function getActiveTask() {
  try {
    const task = await requestAPI("GET", "task/findTaskInProcess");
    return task;
  } catch (error) {
    console.error(error);
  }
}

// Функция завершения задачи
export async function closeTask(navigate, regionFromRedux) {
  try {
    const task = await requestAPI("GET", "task/closedTask");
    navigate(`/work?region=${regionFromRedux}`);
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
