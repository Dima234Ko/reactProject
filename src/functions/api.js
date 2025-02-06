export async function requestAPI(method, action, body) {
  try {
    // Преобразуем объект в строку (или просто передаем строку, если тело уже строка)
    const bodyData = typeof body === "object" ? JSON.stringify(body) : body;

    const response = await fetch(`https://192.168.1.103:8443/${action}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

    // Проверяем успешность ответа
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Читаем тело ответа один раз
    const data = await response.json();
    return data;
  } catch (error) {
    // Обработка ошибок
    console.error("API Request Error:", error);
    throw error;
  }
}
