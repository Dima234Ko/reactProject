export async function requestAPI(method, action) {
  try {
    const response = await fetch(`https://172.24.6.20:7448/${action}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch {
    console.error("Ошибка загрузки фото");
  }
}

// Функция для скачивания фото
export async function downloadPhoto(id) {
  try {
    const response = await requestAPI("GET", `photos/getPhoto/${id}`);
    const blob = await response.blob(); // Получаем бинарные данные как Blob
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Попробуем извлечь имя файла из заголовков, если оно есть
    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = `photo_${id}.jpg`; // Имя по умолчанию
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Ошибка при скачивании фото:", error);
  }
}
