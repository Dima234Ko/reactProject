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
    //console.error(error);
    // Обработка ошибок
    throw error;
  }
}

export async function requestPhoto(method, action, body) {
  try {
    const response = await fetch(`https://172.24.6.20:7449/${action}`, {
      method: method,
      credentials: "include",
      body: body,
    });

    if (response.ok) {
      return "Фото успешно загружено";
    } else return "Ошибка при загрузке на сервер";
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw new Error(`Ошибка при выполнении запроса: ${error.message}`);
  }
}
