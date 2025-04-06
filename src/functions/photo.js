import {downloadPhoto} from "../functions/api"

// Функция для скачивания фото
export async function downloadPhotoToServer(id) {
  try {
    const response = await downloadPhoto('GET', `photos/getPhoto/${id}`);
    const blob = await response.blob(); // Получаем бинарные данные как Blob
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Попробуем извлечь имя файла из заголовков, если оно есть
    const contentDisposition = response.headers.get('Content-Disposition');
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
    console.error('Ошибка при скачивании фото:', error);
  }
}
