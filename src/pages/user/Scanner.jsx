// import React, { useEffect, useRef, useState } from 'react';
// import Quagga from 'quagga';

// const BarcodeScanner = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [barcode, setBarcode] = useState(null);
//   const [scanning, setScanning] = useState(false);

//   // Запуск камеры
//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: 'environment' }, 
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       } catch (err) {
//         console.error('Ошибка доступа к камере:', err);
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject;
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Функция для захвата полного изображения
//   const captureImage = () => {
//     setScanning(true);

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (!video || !canvas) {
//       setScanning(false);
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;

//     // Устанавливаем размеры canvas равными видео
//     canvas.width = videoWidth;
//     canvas.height = videoHeight;

//     // Копируем весь кадр с видео на canvas
//     ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

//     // Отправляем изображение на распознавание
//     const imageData = canvas.toDataURL('image/png');

//     Quagga.decodeSingle(
//       {
//         src: imageData,
//         numOfWorkers: 0, // Отключаем Web Workers для простоты
//         decoder: {
//           readers: ['code_128_reader'], // Читаем только Code128
//         },
//       },
//       (result) => {
//         if (result && result.codeResult) {
//           setBarcode(result.codeResult.code); // Устанавливаем результат
//         } else {
//           setBarcode(null); // Если штрих-код не найден
//         }
//         setScanning(false); // Останавливаем сканирование
//       }
//     );
//   };

//   // Обработчик для кнопки "Верно"
//   const handleCorrect = () => {
//     console.log('Штрих-код верен:', barcode);
//   };

//   // Обработчик для кнопки "Не верно"
//   const handleIncorrect = () => {
//     setBarcode(null); // Очищаем найденный штрих-код
//     setScanning(false); // Возвращаем в состояние сканирования
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Сканер штрих-кода</h2>

//       {/* Видео отображается для пользователя */}
//       <div style={{ position: 'relative', width: '640px', height: '480px', margin: '0 auto' }}>
//         <video
//           ref={videoRef}
//           style={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             border: '1px solid black',
//           }}
//           width="640"
//           height="480"
//           autoPlay
//           playsInline
//           muted
//         />
//       </div>

//       {/* Скрытый canvas для обработки */}
//       <canvas ref={canvasRef} style={{ display: 'none' }} />

//       <button
//         onClick={captureImage}
//         style={{
//           margin: '10px',
//           padding: '10px 20px',
//           fontSize: '16px',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         Распознать
//       </button>

//       {scanning ? (
//         <p>Сканирование...</p>
//       ) : barcode ? (
//         <div>
//           <p>Найден штрих-код: {barcode}</p>
//           <button
//             onClick={handleCorrect}
//             style={{
//               margin: '10px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Верно
//           </button>
//           <button
//             onClick={handleIncorrect}
//             style={{
//               margin: '10px',
//               padding: '10px 20px',
//               fontSize: '16px',
//               backgroundColor: '#f44336',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Не верно
//           </button>
//         </div>
//       ) : (
//         <p>Штрих-код не найден</p>
//       )}
//     </div>
//   );
// };

// export default BarcodeScanner;