import { requestAPI } from "./api";


// Функция для создания нового подключения
export async function connection(
  method,
  action,
  body,
  setLoading,
) {
    setLoading(true);
    try {
        const data = await requestAPI(method, action, body);
        setLoading(false); 
  } catch (error) {
        setLoading(false);
        throw error;
  }
}