import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, UploadButton } from "../../components/Button";
import { Input } from "../../components/Input";
import { getRegion } from "../../functions/region";
import { setWork } from "../../store/actions/workActions";
import { setRegion } from "../../store/actions/regionActions";
import { FormInfo } from "../../components/Form/Form";
import { FormPhoto } from "../../components/Form/FormPhoto";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result"; 
import { searchIdUs, setInfoToUs } from "../../functions/pppoe";

function UserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [regionId, setRegionId] = useState("");
    const work = useSelector((state) => state.work.work);
    const serialFromRedux = useSelector((state) => state.serial.serial);
    const loginFromRedux = useSelector((state) => state.login.login);
    const progressFromRedux = useSelector((state) => state.progress.progress);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phone, setPhone] = useState("");
    const [result, setResult] = useState(null); 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const regionFromUrl = params.get("region");
        const workFromUrl = params.get("work");
        if (regionFromUrl) {
            setRegionId(regionFromUrl);
            dispatch(setRegion(regionFromUrl));
        }
        if (workFromUrl) {
            dispatch(setWork(workFromUrl));
        }

        if (serialFromRedux !== ""){
            fetchDataUser();
        }
    }, [location.search, dispatch]);

    // Асинхронная функция для получения данных WiFi
    const fetchDataUser = async () => {
      try {
        let data;
        if (loginFromRedux !== null) {
          data = await searchIdUs(loginFromRedux, setResult, "login");
        } else if (loginFromUrl === "") {
          data = await searchIdUs(serialFromRedux, setResult, "serial");
        }
        if (data) {
            let result = data.userFullName.split(' ');
            setSurname(result[0] || ""),
            setName(result[1] || ""),
            setPatronymic(result[2] || "")
        }
      } catch (error) {
        console.error("Ошибка при получении данных", error);
        setResult({
          result: "Ошибка при получении данных",
          success: false,
        });
      }
    };

    // Открыть форму для загрузки файла
    const openForm = () => {
        setIsFormOpen(true);
    };

    // Закрыть форму для загрузки файла
    const closeForm = () => {
        setIsFormOpen(false);
    };

    // Обработчик кнопки "Записать"
    const handleSubmit = async () => {
        try {
            setResult("");
            await setInfoToUs(loginFromRedux, surname, name, patronymic, phone);
            setResult({
                result: "Данные записаны",
                success: true,
              });
          } catch (error) {
            setResult({
                result: `Ошибка при записи данных ${error}`,
                success: false,
            });
            console.error(error);
          }
    };

    return (
        <div id="info">
            <h2>Данные верны?</h2>
            <h5>{getRegion(regionId)}</h5>
            <FormInfo
                isFormOpen={isFormOpen}
                closeForm={closeForm}
                formData={
                    <FormPhoto
                        isUploading={isUploading}
                        setIsUploading={setIsUploading}
                        setFile={setFile}
                        login="aks34447" 
                    />
                }
            />
            <div className="input-container">
                <Input
                    id="surname"
                    type="text"
                    placeholder="Введите фамилию"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <Input
                    id="name"
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    id="patronymic"
                    type="text"
                    placeholder="Введите отчество"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                />
                <Input
                    id="phone"
                    type="tel"
                    placeholder="Введите телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <UploadButton onClick={openForm} />

            {loading && (
                <div className="overlay">
                    <div className="spinner-container">
                        <Loader progress={progressFromRedux} />
                    </div>
                </div>
            )}

            {result && <Result data={result} />}

            <Button
                name="Записать"
                onClick={handleSubmit}
            />
        </div>
    );
}

export default UserInfo;