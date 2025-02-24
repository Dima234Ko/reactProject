import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSerial } from "../../store/actions/serialActions";
import { setRegion } from "../../store/actions/regionActions";
import { setProgress } from "../../store/actions/progressActions";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { getStatus } from "../../functions/status";
import { checkTaskStatus } from "../../functions/task";
import { NextButton } from "../../components/Link";
import { FormInfo } from "../../components/Form/Form";
import { Checkbox } from "../../components/Checkbox";
import { getParamBrowserUrl } from "../../functions/url";

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const progressFromRedux = useSelector((state) => state.progress.progress);
  const regionFromRedux = useSelector((state) => state.region.region);
  const [serial, setSerialState] = useState(serialFromRedux || "");
  const [regionId, setRegionId] = useState(regionFromRedux || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [formContent, setFormContent] = useState({
    fromData: "",
  });

  // Синхронизация serial с Redux и regionId с URL
  useEffect(() => {
    setSerialState(serialFromRedux);
    const params = new URLSearchParams(location.search);
    const regionFromUrl = getParamBrowserUrl("region");
    setRegionId(regionFromUrl); 
    dispatch(setRegion(regionFromUrl));
  }, [serialFromRedux, location.search]);

  // Проверка статуса задачи при изменении URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkTaskStatus(
          location,
          loading,
          result,
          dispatch,
          setSerial,
          setLoading,
          setResult,
          navigate,
        );
      } catch (error) {
        setResult({
          result: error.message,
          success: false,
        });
      }
    };

    fetchData();
  }, [location.search, navigate]);

  const handleInputChange = (event) => {
    const newSerial = event.target.value;
    setSerialState(newSerial);
    dispatch(setSerial(newSerial));
  };

  // Обработчик для получения статуса
  const handleGetStatus = async () => {
    setFormContent({
      fromData: (
        <div className="textForm">
          <h2>Внимание</h2>
          <div>
            <pre>В данной версии приложения:</pre>
          </div>
          <ul>
            <li>
              Функции из расширенной настройки вынесены в меню в верхнем правом
              углу.
            </li>
            <li>
              Решена проблема прерывания запроса при сворачивании браузера.
            </li>
            <li>
              Добавлена возможность заполнения ФИО абонента для карточки в US.
            </li>
            <li>
              Реализована возможность передачи ошибки (скопируйте ссылку,
              передайте её на 2ЛТП с описанием проблемы).
            </li>
          </ul>
        </div>
      ),
    });
    dispatch(setProgress(0));
    setLoading(true);
    setResult(null);
    setError("");
    setIsFormOpen(true);

    try {
      await getStatus(
        serial,
        isChecked,
        setLoading,
        setResult,
        dispatch,
        navigate, 
        regionId,
        progressFromRedux,
        setError,
      );
      setIsChecked(false);
    } catch (error) {
      setResult({
        result: error.message,
        success: false,
      });
    }

    setTimeout(() => {
      setIsFormOpen(false);
    }, 30000);
  };

  // Функция для изменения состояния чекбокса
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Функция для закрытия формы
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div id="status">
      <h2>Статус NTU</h2>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent.fromData}
      />
      <Input
        id="id_Ntu"
        type="text"
        placeholder="Введите pon-serial"
        value={serial}
        onChange={handleInputChange}
      />
      <Checkbox
        label="Сброс устройства"
        id="reset"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Button
        name="Отправить запрос"
        onClick={handleGetStatus}
        disabled={false}
      />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader progress={progressFromRedux} />
          </div>
        </div>
      )}
      {result && <Result data={result} />}
      <NextButton
        to={`/pppoe?region=${regionId}&serial=${serial}`}
        disabled={result === null || result?.success !== true}
      />
    </div>
  );
}

export default Status;