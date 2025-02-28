import { useState } from "react";
import {  useSelector } from "react-redux";
import { NewConnectionButton, MalfunctionButton, DisconnectButton } from "../../components/Button";
import { getRegion } from "../../functions/region";

function Work() {
    const regionFromRedux = useSelector((state) => state.region.region);
    const [regionId, setRegionId] = useState(regionFromRedux || "");

  return (
    <div id="work">
      <h2>Выбор действия</h2>
      <h5>{getRegion(regionId)}</h5>
        <NewConnectionButton  onClick={console.log('Новое подключение')} />
        <MalfunctionButton  onClick={console.log('Неисправность')} />
        <DisconnectButton  onClick={console.log('Отключение')} />
    </div>
  );
}

export default Work;
