import { useState, useEffect } from "react";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { requestAPI } from "../../functions/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegion } from "../../store/actions/regionActions";
import { updateUrlWithParam } from "../../functions/url";
import Result from "../../components/Result";

// Убрано дублирование импорта useNavigate
function Region() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const reg = await requestAPI("GET", "settings/getRegion");
        setRegions(reg);
        // Устанавливаем дефолтное значение только если массив не пустой
        if (reg?.length > 0) {
          setSelectedRegion(reg[0].regionName);
          dispatch(setRegion(reg[0].id));
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных региона:", error);
      }
    };

    fetchRegion();
  }, [dispatch]);

  // Извлекаем regionName для Select с проверкой на пустой массив
  const regionNames =
    regions.length > 0 ? regions.map((item) => item.regionName) : [];

  const handleApply = () => {
    const selectedRegionData = regions.find(
      (item) => item.regionName === selectedRegion,
    );

    if (selectedRegionData) {
      const regionId = selectedRegionData.id;
      dispatch(setRegion(regionId));
      updateUrlWithParam("region", regionId, navigate);
      setResult({
        result: "Регион изменен",
        success: true,
      });
      // Исправлен синтаксис navigate и добавлена навигация
      navigate(`/work?region=${regionId}`);
    } else {
      setResult({
        result: "Ошибка смены региона",
        success: false,
      });
    }
  };

  return (
    <div id="region">
      <h2>Выбор региона</h2>
      <Select
        id="reg"
        options={regionNames}
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      />
      {result && <Result data={result} />}
      <Button name="Применить" onClick={handleApply} />
    </div>
  );
}

export default Region;
