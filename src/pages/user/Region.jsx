import { useState, useEffect } from "react";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { requestAPI } from "../../functions/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { setRegion } from "../../store/actions/regionActions"; 
import { updateUrlWithParam } from "../../functions/url";

function Region() {
  const [regions, setRegions] = useState([]); // Храним полные данные регионов
  const [selectedRegion, setSelectedRegion] = useState(""); // Храним выбранный регион
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Инициализируем dispatch

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const reg = await requestAPI("GET", "settings/getRegion");
        setRegions(reg);
        // Устанавливаем дефолтное значение
        if (reg.length > 0) {
          setSelectedRegion(reg[0].regionName);
          dispatch(setRegion(reg[0].id)); // Сохраняем id первого региона в Redux
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных региона:", error);
      }
    };

    fetchRegion();
  }, [dispatch]); // Добавляем dispatch в зависимости

  // Извлекаем только regionName для Select
  const regionNames = regions.map(item => item.regionName);

  // Обработчик нажатия кнопки
  const handleApply = () => {
    // Находим id выбранного региона
    const selectedRegionData = regions.find(
      item => item.regionName === selectedRegion
    );
    if (selectedRegionData) {
      const regionId = selectedRegionData.id;
      // Сохраняем id региона в Redux
      dispatch(setRegion(regionId));
      // Обновляем URL с использованием id региона
      updateUrlWithParam("region", regionId, navigate);
    }
  };

  return (
    <div id="region">
      <h2>Выбор региона</h2>
      <Select 
        id="reg" 
        options={regionNames} 
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)} // Обновляем выбранный регион
      />
      <Button name="Применить" onClick={handleApply} />
    </div>
  );
}

export default Region;