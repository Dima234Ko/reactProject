import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { setRegion } from "../../store/actions/regionActions";
import { NewConnectionButton, MalfunctionButton, DisconnectButton } from "../../components/Button";
import { getRegion } from "../../functions/region";
import { setWork } from "../../store/actions/workActions";
import { connection, getActiveTask } from "../../functions/work";
import { getParamBrowserUrl } from "../../functions/url";

function Work() {
    const [loading, setLoading] = useState(false);
    const regionFromRedux = useSelector((state) => state.region.region);
    const [regionId, setRegionId] = useState(regionFromRedux || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const regionFromUrl = getParamBrowserUrl("region");

    useEffect(() => {
      getActiveTask();
      if (regionFromUrl) {
        setRegionId(regionFromUrl);
        dispatch(setRegion(regionFromUrl));
      }
    }, [location.search, navigate]);


    // Функция для создания нового подключения
    const newConnection = async () => {
        try {
          await connection("POST", 
            "newConnection/createNewConnection", 
            regionId,
            setLoading);
          const work = 'newConnection';
          dispatch(setWork(work)); 
          navigate(`/status?region=${regionId}&work=${work}`);
        } catch (error) {
            console.error("Ошибка при создании подключения:", error);
        }
    };

    // Функция для регистрации неисправности
    const newMalfunction = () => {
        const work = 2;
        dispatch(setWork(work));
        navigate(`/malfunction?region=${regionId}&work=${work}`);
    };

    // Функция для отключения
    const newDisable = () => {
        const work = 3;
        dispatch(setWork(work));
        navigate(`/disable?region=${regionId}&work=${work}`);
    };

    return (
        <div id="work">
            <h2>Выбор действия</h2>
            <h5>{getRegion(regionId)}</h5>
            {/* Кнопка нового подключения */}
            <NewConnectionButton onClick={newConnection} />
            {/* Кнопка регистрации неисправности */}
            <MalfunctionButton onClick={newMalfunction} />
            {/* Кнопка отключения */}
            <DisconnectButton onClick={newDisable} />
            {/* Показываем индикатор загрузки при активном состоянии */}
            {loading && (
                <div className="overlay">
                    <div className="spinner-container">
                        <Loader />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Work;