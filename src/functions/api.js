export async function requestAPI(method, action, body) {
  try {
    const bodyData = typeof body === "object" ? JSON.stringify(body) : body;

    const response = await fetch(`https://172.24.6.20:7449/${action}`, {
      //const response = await fetch(`https://192.168.1.103:8443/${action}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

    // Проверяем успешность ответа
    if (!response.ok) {
      let errorMessage;
      if (response.status === 403) {
        errorMessage = `API ключ истек или у вас нет доступа к данной задаче, пройдите авторизацию`;
      } else {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Читаем тело ответа один раз
    const data = await response.json();
    return data;
  } catch (error) {
    // Обработка ошибок
    throw error;
  }
}
