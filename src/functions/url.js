/**
 * Обновляет URL, добавляя или изменяя указанный параметр, без перезагрузки страницы.
 *
 * @param {string} key - Ключ параметра.
 * @param {string} value - Значение параметра.
 * @param {Function} navigate - Функция навигации (react-router).
 */

export function updateUrlWithParam(key, value, navigate) {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  searchParams.set(key, value);
  navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
    replace: true,
  });
}

/**
 * Удаляет указанный параметр из URL, не перезагружая страницу.
 *
 * @param {string} key - Ключ параметра, который нужно удалить.
 * @param {Function} navigate - Функция навигации (react-router).
 */

export function removeUrlParam(key, navigate) {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  searchParams.delete(key);
  navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
    replace: true,
  });
}

/**
 * Получает числовое значение параметра из URL, если оно действительно является числом.
 *
 * @param {string} param - Ключ параметра.
 * @returns {string} Строка, содержащая число, или пустая строка, если значение не является числом.
 */

export function getNumberBrowserUrl(param) {
  const params = new URLSearchParams(window.location.search);
  const data = params.get(param) || '';
  return data.match(/^\d+$/) ? data : '';
}

/**
 * Получает значение параметра из URL.
 *
 * @param {string} param - Ключ параметра.
 * @returns {string} Значение параметра или пустая строка, если параметр отсутствует.
 */

export function getParamBrowserUrl(param) {
  const params = new URLSearchParams(window.location.search);
  const data = params.get(param) || '';
  return data;
}
