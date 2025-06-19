import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SwitchComponent from '../../components/Swich';

function Instructions() {
  const task = useSelector((state) => state.page.task);
  const [showInstructions, setShowInstructions] = useState(task);

  useEffect(() => {
    setShowInstructions(task);
  }, [task]);

  return (
    <div id="instructions">
      <div className="switch-section">
        <SwitchComponent
          options={[
            { label: 'Подключение PPPoE', value: true },
            { label: 'Подключение CCTV', value: false },
          ]}
        />
      </div>

      {showInstructions ? (
        <div>
          <ul className="text">
            <li>Выбираем регион</li>
            <li>Выбираем нужное действие (Новое подключение)</li>
            <li>Вводим pon-serial и отправляем запрос</li>
            <li>После успешного завершения запроса нажимаем «Далее»</li>
            <li>Выбираем тип подключения (Настройка PPPoE)</li>
            <li>Указываем данные пользователя и отправляем запрос</li>
          </ul>
          <p className="warning-box">
            При настройке PPPoE, если данная NTU уже использовалась у другого абонента, возникнет
            уведомление с просьбой подтвердить правильность действия. Просьба в таком случае ещё
            раз всё внимательно проверить, так как после подтверждения pon serial будет удалён из
            карточки абонента, у которого ранее стоял терминал.
          </p>
          <ul className="text">
            <li>Нажимаем далее и переходим в настройку WiFi</li>
            <li>Вводим SSID и пароль от сетей WiFi</li>
            <li>Выбираем каналы и отправлеям запрос</li>
          </ul>
          <p className="warning-box">
            При выборе каналов необходимо использовать приложение WiFi Analyzer (Android) или AirPort (iPhone)
            и просканировать эфир, после чего выбрать каналы с наименьшим количеством устройств.
          </p>
          <ul className="text">
            <li>Нажимаем далее и переходим на уточнение данных</li>
            <li>Заполняем ФИО абонента и его номер</li>
            <li>Нажимаем кнопку "Добавить фото"</li>
            <li>Загружаем необходимые фото (скриншот эфира WiFi)</li>
            <li>Нажимаем кнопку записать</li>
          </ul>
          <p className="warning-box">
            Загрузка скриншота эфира WiFi и наряда на работы обязательна! Без выполнения этого действия завершающая 
            кнопка "Записать" будет недоступна.
          </p>
        </div>
      ) : (
        <div>
        <ul className="text">
          <li>Выбираем регион</li>
          <li>Выбираем нужное действие (Новое подключение)</li>
          <li>Вводим pon-serial и отправляем запрос</li>
          <li>После успешного завершения запроса нажимаем «Далее»</li>
          <li>Выбираем тип подключения (Видеонаблюдение)</li>
          <li>Выбираем количество портов</li>
        </ul>
        <p className="warning-box">
          1 порт - настроится 4 порт <br />
          2 порта - 3,4 <br />
          3 порта - 2,3,4 <br />
          4 порта - все
        </p>
        <ul className="text">
          <li>При настройке NTU для камер "Безопасного двора" выбираем услугу "БД"</li>
          <li>При настройке NTU для камер физическому лицу выбираем услугу "ФЛ"</li>
        </ul>
        <p className="warning-box">
          При настройке NTU для камер "БД" в Костроме или Западной Якутии во всплывающем окне 
          необходимо указать Vlan соответствующий району. NTU должна быть новая или сброшена. 
          Сброс можно сделать на странице статус.
        </p>
      </div>
      )}
    </div>
  );
}

export default Instructions;