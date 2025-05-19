import React from 'react';

function ShareButton() {
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: document.title,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
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

export default ShareButton;
