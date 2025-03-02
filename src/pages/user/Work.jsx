import { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NewConnectionButton, MalfunctionButton, DisconnectButton } from "../../components/Button";
import { getRegion } from "../../functions/region";
import { setWork } from "../../store/actions/workActions";

function Work() {
    const regionFromRedux = useSelector((state) => state.region.region);
    const [regionId, setRegionId] = useState(regionFromRedux || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let work = 0;

    const newConnection = () => {
        work = 1;
        dispatch(setWork(work));
        navigate(`/status?region=${regionId}&work=${work}`);
    }

    const malfunction = () => {
        work = 2;
        navigate(`/malfunction?region=${regionId}&work=${work}`);
    }
    

  return (
    <div id="work">
      <h2>Выбор действия</h2>
      <h5>{getRegion(regionId)}</h5>
        <NewConnectionButton  onClick={newConnection} />
        <MalfunctionButton  onClick={malfunction} />
        <DisconnectButton  onClick={console.log('Отключение')} />
    </div>
  );
}

export default Work;
