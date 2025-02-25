import { useState } from "react";
import { Input } from "../../components/Input";
import { FormInfo } from "../../components/Form/Form";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Checkbox } from "../../components/Checkbox";
import { RadioButtonGroup } from '../../components/RadioButtonGroup';

function Disabling() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [serial, setSerial] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({ result: "", success: true });
    const [progress, setProgress] = useState(0);
    const [isChecked, setIsChecked] = useState(false); // Состояние для первого чекбокса (Неисправность)
    const [isAbonentChecked, setIsAbonentChecked] = useState(false); // Состояние для второго чекбокса (Отключение абонента)

    const radioOptions = {
        option1: 'Проблемы с Wi-Fi соединением',
        option2: 'Проблемы с оптическим сигналом',
        option3: 'Отсутствие индикации',
        option4: 'Механическое повреждение'
    };

    // Обработчик для первого чекбокса
    const handleFirstCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            // Если включен первый чекбокс, сбрасываем второй
            setIsAbonentChecked(false);
        }
    };

    // Обработчик для второго чекбокса
    const handleSecondCheckboxChange = (e) => {
        setIsAbonentChecked(e.target.checked);
        if (e.target.checked) {
            // Если включен второй чекбокс, сбрасываем первый
            setIsChecked(false);
        }
    };

    const formContent = {
        formData: (
            <div className="textForm">
                <h2>Внимание</h2>
                <pre>Уточните причину</pre>
                <div className="input-container" id="disablingForm">
                    <Checkbox
                        label="Неисправность оборудования"
                        checked={isChecked}
                        onChange={handleFirstCheckboxChange} 
                    />
                    <RadioButtonGroup options={radioOptions} isVisible={isChecked} />
                    <Checkbox
                        label="Отключение абонентской линии"
                        checked={isAbonentChecked}
                        onChange={handleSecondCheckboxChange} 
                    />
                    <Button name="Ок" onClick={console.log('кнопка нажата')} />
                    </div>
            </div>
        ),
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div id="disabling">
            <h2>Отключение NTU</h2>
            <FormInfo
                isFormOpen={isFormOpen}
                closeForm={closeForm}
                formData={formContent.formData} 
            />
            <Input
                id="id_Ntu"
                type="text"
                placeholder="Введите pon-serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)} 
                disabled={loading} 
            />
            <Button name="Снять NTU" onClick={openForm} />
            {loading && (
                <div className="overlay">
                    <div className="spinner-container">
                        <Loader progress={progress} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Disabling;
