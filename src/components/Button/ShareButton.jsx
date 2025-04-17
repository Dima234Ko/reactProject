import React from 'react';

export function ShareButton() {
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: document.title,
      url,
    };

    try {
      // Проверяем поддержку Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Запасной вариант: копируем URL в буфер обмена
        await navigator.clipboard.writeText(url);
        alert('URL скопирован в буфер обмена!');
      }
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
      // Дополнительный запасной вариант
      alert('Не удалось поделиться. URL: ' + url);
    }
  };

  return (
    <button
      className="share-button"
      onClick={handleShare}
      aria-label="Поделиться текущей страницей"
    >
      Поделиться проблемой
    </button>
  );
}
