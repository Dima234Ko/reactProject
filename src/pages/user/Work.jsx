import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRegion } from '../../functions/region';
import { setWork } from '../../store/actions/workActions';
import { connection, getActiveTask } from '../../functions/work';
import { getParamBrowserUrl } from '../../functions/url';
import { setRegion } from '../../store/actions/regionActions';
import NewConnectionButton from '../../components/Button/NewConnectionButton';
import MalfunctionButton from '../../components/Button/MalfunctionButton';
import DisconnectButton from '../../components/Button/DisconnectButton';
import Loader from '../../components/Loader';

function Work() {
  const [loading, setLoading] = useState(false);
  const regionFromRedux = useSelector((state) => state.region.region);
  const taskFromRedux = useSelector((state) => state.task);
  const [regionId, setRegionId] = useState(regionFromRedux || '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const regionFromUrl = getParamBrowserUrl('region');

  useEffect(() => {
    const fetchActiveTask = async () => {
      try {
        let body = {
          regionId: regionId,
        };
        await getActiveTask(dispatch);
      } catch (error) {
        console.error('Ошибка при получении активной задачи:', error);
      }
    };
    fetchActiveTask();

    if (regionFromUrl && regionFromUrl !== regionId) {
      setRegionId(regionFromUrl);
      dispatch(setRegion(regionFromUrl));
    }
  }, [location.search, dispatch, regionFromUrl]);

  const newConnection = async () => {
    try {
      setLoading(true);
      await connection(
        'POST',
        'startHeader/createNewConnection',
        regionId,
        setLoading
      );
      const work = 'newConnection';
      dispatch(setWork(work));
      navigate(`/status?region=${regionId}&work=${work}`);
    } catch (error) {
      console.error('Ошибка при создании подключения:', error);
      setLoading(false);
    }
  };

  const newMalfunction = async () => {
    try {
      setLoading(true);
      await connection(
        'POST',
        'startHeader/createNewMalfunction ',
        regionId,
        setLoading
      );
      const work = 'createNewMalfunction';
      dispatch(setWork(work));
      // navigate(`/malfunction?region=${regionId}&work=${work}`);
      navigate(`/status?region=${regionId}&work=${work}`);
    } catch (error) {
      console.error('Ошибка при создании подключения:', error);
      setLoading(false);
    }
  };

  const newDisable = async () => {
    try {
      setLoading(true);
      await connection(
        'POST',
        'startHeader/createEquipmentShutdown',
        regionId,
        setLoading
      );
      const work = 'equipmentShutdown';
      dispatch(setWork(work));
      navigate(`/disable?region=${regionId}&work=${work}`);
    } catch (error) {
      console.error('Ошибка при создании подключения:', error);
      setLoading(false);
    }
  };

  return (
    <div id="work">
      <h2>Выбор действия</h2>
      <h5>{regionId ? getRegion(regionId) : 'Регион не выбран'}</h5>
      <NewConnectionButton
        onClick={newConnection}
        disabled={taskFromRedux.transition}
      />
      <MalfunctionButton
        onClick={newMalfunction}
        disabled={taskFromRedux.transition}
      />
      <DisconnectButton
        onClick={newDisable}
        disabled={taskFromRedux.transition}
      />
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
