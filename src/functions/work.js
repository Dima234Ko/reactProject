import { requestAPI } from "./api";


// Функция для создания нового подключения
export async function connection(
  method,
  action,
  regionId,
  setLoading,
) {
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