import React, { useEffect } from 'react';
import icon180 from '../img/icon180.png';
import icon120 from '../img/icon120.png';
import icon167 from '../img/icon167.png';
import icon152 from '../img/icon152.png';
import icon76 from '../img/icon76.png';
import icon32 from '../img/icon32.png';

// Функция для установки иконок
export const setFavicon = () => {
  // Список иконок
  const icons = [
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      href: icon32,
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: icon180,
    },
    {
      rel: "apple-touch-icon",
      sizes: "167x167",
      href: icon167,
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: icon152,
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: icon120,
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: icon76,
    },
    {
      rel: "apple-touch-icon",
      href: "https://downloader.disk.yandex.ru/preview/eb26ba2b40df165d83081d2e2817efe2db3baedc1bcc2f40e2f11f537cd0a31c/67e14793/Z70CsBJeMAnY8FCVqat0p_M0n455ezPNqAP2F9Lli3B9qn6X3D8qygHO3-c1yUYXiR_UBhUt7nOb-pn7fwxlJA%3D%3D?uid=0&filename=apple-touch-icon-180x180-precomposed.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048",
    },
  ];

  // Удаляем существующие иконки
  const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
  existingIcons.forEach(icon => icon.remove());

  // Добавляем новые иконки
  icons.forEach((icon) => {
    const link = document.createElement('link');
    link.rel = icon.rel;
    if (icon.sizes) link.sizes = icon.sizes;
    if (icon.type) link.type = icon.type;
    link.href = icon.href;
    document.head.appendChild(link);
  });
};

// Компонент для установки иконок
const FavIcon = () => {
  useEffect(() => {
    setFavicon();

    // Очистка при размонтировании компонента
    return () => {
      const icons = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
      icons.forEach(icon => icon.remove());
    };
  }, []);

  return null; // Компонент ничего не рендерит в DOM
};

export default FavIcon;