import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для запуска камеры и инициализации Quagga
    const startScanner = async () => {
      try {
        // Запрашиваем доступ к камере напрямую через getUserMedia
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Задняя камера
        });

        // Присваиваем поток видео элементу
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Инициализация Quagga после получения потока
        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current, // Используем тот же элемент video
            },
            decoder: {
              readers: ['ean_reader', 'code_128_reader'], // Типы штрихкодов
            },
          },
          (err) => {
            if (err) {
              console.error('Ошибка инициализации Quagga:', err);
              setError('Не удалось инициализировать сканер штрихкодов.');
              return;
            }
            Quagga.start();
          }
        );

        // Обработчик обнаружения штрихкода
        Quagga.onDetected((result) => {
          const code = result.codeResult.code;
          setBarcode(code);
        });
      } catch (error) {
        console.error('Ошибка при доступе к камере:', error);
        setError('Не удалось получить доступ к камере. Проверьте разрешения.');
      }
    };

    startScanner();

    // Очистка при размонтировании компонента
    return () => {
      Quagga.offDetected();
      Quagga.stop();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Сканер штрихкода</h1>
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <video
          ref={videoRef}
          style={{ width: '100%', border: '1px solid #ccc' }}
          autoPlay
          playsInline
          muted
        />
      </div>
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
      {barcode && (
        <div style={{ marginTop: '20px' }}>
          <h2>Найденный штрихкод:</h2>
          <p>{barcode}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;