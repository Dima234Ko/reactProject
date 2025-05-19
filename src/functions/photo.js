import { downloadPhoto } from '../functions/api';
<<<<<<< HEAD

/**
 * Функция выгрузки фото
 * @param {string} id - id загружаемой фотографии
 */
=======
>>>>>>> 80727152aee48e53dbd539658eab25aa63bdcdc5

export async function downloadPhotoToServer(id) {
  try {
    const response = await downloadPhoto('GET', `photos/getPhoto/${id}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers.get('Content-Disposition');
    let fileName = `photo_${id}.jpg`;
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
