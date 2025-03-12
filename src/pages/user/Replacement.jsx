import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import Result from "../../components/Result";
import { getRegion } from "../../functions/region";

function Replcement() {
  return (
    <div id="repalcement">
      <h2>Замена NTU</h2>
      {/* <h5>{getRegion(regionId)}</h5> */}
      <div className="pon-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial"
        //   value={serial}
          onChange={(e) => setSerialState(e.target.value)}
        />
      </div>
      <div className="pon-container">
        <Input
          id="id_Ntu"
          type="text"
          placeholder="Введите pon-serial"
        //   value={serial}
          onChange={(e) => setSerialState(e.target.value)}
        />
      </div>
      <Button name="Отправить запрос" onClick={console.log('Замена')} />
      {/* {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Loader/>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Replcement;
