import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../Input';
import { Select, DropdownSelect } from '../Select';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import {
  setRegionTask,
  setWorkTask,
  setStartDate,
  setEndDate,
  setUserPage,
  setPonSerialPage,
  setCannal,
  setLoginTask,
} from '../../store/actions/pageLogTaskActions';
import { getLogins } from '../../functions/account';
import { requestAPI } from '../../functions/api';
import { getRegionForName } from '../../functions/region';
import { getWork, setWork } from '../../functions/report';

export function FormFilterReport({ onClose, task }) {
  const dispatch = useDispatch();
  const pageLog = useSelector((state) => state.page);
  const [cannal, setLocalCannal] = useState(pageLog.cannal || '');
  const [startDate, setLocalStartDate] = useState(pageLog.startDate || '');
  const [endDate, setLocalEndDate] = useState(pageLog.endDate || '');
  const [selectedUser, setSelectedUser] = useState(pageLog.userPage || '');
  const [selectedRegion, setSelectedRegion] = useState(
    pageLog.regionTask || ''
  );
  const [selectedWork, setSelectedWork] = useState(pageLog.workTask || '');
  const [ponSerial, setLocalPonSerial] = useState(pageLog.ponSerialPage || '');
  const [login, setLocalLogin] = useState(pageLog.loginTask || '');
  const [isManualChecked, setIsManualChecked] = useState(
    pageLog.cannal === 'manual'
  );
  const [isAutoChecked, setIsAutoChecked] = useState(pageLog.cannal === 'auto');
  const [users, setUsers] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загрузка пользователей
        const userList = await getLogins();
        setUsers(userList);

        // Загрузка регионов
        const regionList = await requestAPI('GET', 'settings/getRegion');
        const updatedRegionList = [
          { regionName: 'Все регионы', id: 'all' },
          ...regionList,
        ];
        setRegions(updatedRegionList);

        // Устанавливаем первый регион по умолчанию
        if (updatedRegionList?.length > 0) {
          setSelectedRegion(updatedRegionList[0].regionName);
        }

        // Устанавливаем первый work по умолчанию
        const workList = getWork();
        if (workList?.length > 0) {
          setSelectedWork(workList[0]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  // Обработчик изменения чекбокса "Ручной"
  const handleManualChange = (checked) => {
    setIsManualChecked(checked);
    if (checked) {
      setLocalCannal('manual');
      setIsAutoChecked(false);
    } else if (!isAutoChecked) {
      setLocalCannal('');
    }
  };

  // Обработчик изменения чекбокса "Авто"
  const handleAutoChange = (checked) => {
    setIsAutoChecked(checked);
    if (checked) {
      setLocalCannal('auto');
      setIsManualChecked(false);
    } else if (!isManualChecked) {
      setLocalCannal('');
    }
  };

  // Обработчик поиска
  const handleSearch = async () => {
    try {
      dispatch(setRegionTask(getRegionForName(selectedRegion)));
      dispatch(setWorkTask(setWork(selectedWork)));
      dispatch(setStartDate(startDate));
      dispatch(setEndDate(endDate));
      dispatch(setUserPage(selectedUser));
      dispatch(setPonSerialPage(ponSerial));
      dispatch(setLoginTask(login)); // Добавлено сохранение login в Redux

      const cannalValue = isManualChecked
        ? 'manual'
        : isAutoChecked
          ? 'auto'
          : null;
      dispatch(setCannal(cannalValue));

      const selectedRegionData = regions.find(
        (item) => item.regionName === selectedRegion
      );

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Ошибка в handleSearch:', error);
    }
  };

  const regionNames =
    regions.length > 0 ? regions.map((item) => item.regionName) : [];
  const workNames = getWork();

  return (
    <div className="input-container">
      <div className="textForm">
        <h3>Период</h3>
        <div className="date-container">
          <Input
            id="start_data"
            type="date"
            value={startDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
          />
          <Input
            id="stop_data"
            type="date"
            value={endDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
          />
        </div>
        <div className="sel-container">
          <Select
            id="sel"
            options={regionNames}
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          />

          <DropdownSelect
            id="user-select"
            options={users}
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          />

          {task === true && (
            <Select
              id="sel"
              options={workNames}
              value={selectedWork}
              onChange={(e) => setSelectedWork(e.target.value)}
            />
          )}
        </div>

        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial"
          value={ponSerial}
          onChange={(e) => setLocalPonSerial(e.target.value)}
        />
        <Input
          id="input_login"
          type="text"
          placeholder="Введите учетную запись"
          value={login}
          onChange={(e) => setLocalLogin(e.target.value)}
        />
        {task !== true && (
          <div className="wifiSearch">
            <h6>Выбор каналов WiFi</h6>
            <div className="checkbox-container">
              <Checkbox
                label="Ручной"
                id="manual"
                checked={isManualChecked}
                onChange={(e) => handleManualChange(e.target.checked)}
              />
              <Checkbox
                label="Авто"
                id="auto"
                checked={isAutoChecked}
                onChange={(e) => handleAutoChange(e.target.checked)}
              />
            </div>
          </div>
        )}
      </div>
      <Button name="Поиск" onClick={() => handleSearch()} />
    </div>
  );
}
