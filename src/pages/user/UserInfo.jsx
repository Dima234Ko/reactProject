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

function UserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [regionId, setRegionId] = useState("");
    const work = useSelector((state) => state.work.work);
    const progressFromRedux = useSelector((state) => state.progress.progress);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        surname: "",
        name: "",
        patronymic: "",
        phone: "",
    });
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
    }, [location.search, dispatch]);

    // Обработчик изменения полей формы
    const handleInputChange = (e, field) => {
        setFormFields({
            ...formFields,
            [field]: e.target.value,
        });
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
    const handleSubmit = () => {
        setLoading(true);
        // Здесь можно добавить логику отправки данных
        console.log("Данные для отправки:", formFields);
        // Имитация загрузки
        setTimeout(() => {
            setLoading(false);
            setResult({ success: true, message: "Данные успешно записаны!" }); // Пример результата
        }, 2000);
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
                    value={formFields.surname}
                    onChange={(e) => handleInputChange(e, "surname")}
                />
                <Input
                    id="name"
                    type="text"
                    placeholder="Введите имя"
                    value={formFields.name}
                    onChange={(e) => handleInputChange(e, "name")}
                />
                <Input
                    id="patronymic"
                    type="text"
                    placeholder="Введите отчество"
                    value={formFields.patronymic}
                    onChange={(e) => handleInputChange(e, "patronymic")}
                />
                <Input
                    id="phone"
                    type="tel"
                    placeholder="Введите телефон"
                    value={formFields.phone}
                    onChange={(e) => handleInputChange(e, "phone")}
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