export function updateUrlWithParam(key, value, navigate) {
  const currentUrl = new URL(window.location.href); // Получаем текущий URL
  const searchParams = currentUrl.searchParams; // Получаем параметры из текущего URL
  searchParams.set(key, value); // Добавляем или обновляем параметр с заданным ключом и значением
  navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
    replace: true,
  }); // Перезаписываем URL с новым параметром, не перезагружая страницу
}

export function removeUrlParam(key, navigate) {
  const currentUrl = new URL(window.location.href); // Получаем текущий URL
  const searchParams = currentUrl.searchParams; // Получаем параметры из текущего URL
  searchParams.delete(key); // Удаляем параметр с заданным ключом
  navigate(`${currentUrl.pathname}?${searchParams.toString()}`, {
    replace: true,
  }); // Перезаписываем URL с обновленными параметрами, не перезагружая страницу
}

export function getNumberBrowserUrl(param) {
  const params = new URLSearchParams(window.location.search);
  const data = params.get(param) || "";
  return data.match(/^\d+$/) ? data : "";
}

export function getParamBrowserUrl(param) {
  const params = new URLSearchParams(window.location.search);
  const data = params.get(param) || "";
  return data.match(/^.{1,8}$/) ? data : "";
}
