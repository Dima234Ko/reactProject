import { requestAPI } from '../functions/api';

/**
 * Обрабатывает смену пароля через API.
 * @param {Object} data - Данные для обработки
 * @param {string} data.password - Новый пароль
 * @param {Function} data.setLoading - Устанавливает состояние загрузки
 * @param {Function} data.setResult - Устанавливает результат операции
 * @param {Function} data.navigate - Функция навигации
 */

export async function changePasswordProcessing(data) {
  const { password, setLoading, navigate, setResult } = data;

  setLoading(true);
  setResult(null);

  const body = {
    password: password,
  };
  try {
    if (password.length <= 4) {
      data.setResult({
        success: false,
        message: 'Длина пароля должна быть больше 4 символов',
      });
      return;
    }
    if (password.trim() === '') {
      setResult({
        success: false,
        message: 'Пароль не может быть пустым',
      });
      return;
    }
    const response = await requestAPI('POST', 'settings/updateUserPass', body);
    data.setResult({
      success: true,
      message: 'Пароль успешно изменен',
    });
    navigate('/');
  } catch (error) {
    console.error('Ошибка при смене пароля:', error);
    setResult({
      success: false,
      message: error.message || 'Ошибка. Попробуйте ещё раз',
    });
  } finally {
    setLoading(false);
  }
}
