function getURL (){
  return `https://r1.sv-en.ru:8443/`
  //return `https://172.24.6.4:7448/`
  // return `https://172.24.6.20:7448/`
  //return `https://r1.sv-en.ru:7449/`
}

export async function requestAPI(method, action, body) {
  try {
    const bodyData = typeof body === 'object' ? JSON.stringify(body) : body;

    const response = await fetch(`${getURL()}${action}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
    throw error;
  }
}

export async function uploadPhoto(method, action, body) {
  try {
    const response = await fetch(`${getURL()}${action}`, {
      method: method,
      credentials: 'include',
      body: body,
    });

    if (response.ok) {
      return 'Фото успешно загружено';
    } else return 'Ошибка при загрузке на сервер';
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw new Error(`Ошибка при выполнении запроса: ${error.message}`);
  }
}


export async function downloadPhoto(method, action) {
  try {
    const response = await fetch(`${getURL()}${action}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch {
    console.error('Ошибка загрузки фото');
  }
}