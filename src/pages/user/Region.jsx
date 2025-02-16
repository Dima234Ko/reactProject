import { Select } from "../../components/Select";
import { Button } from "../../components/Button";

function Region() {
  let region = ["Кострома", "Мирный"];

  return (
    <div id="region">
      <h2>Выбор региона</h2>
      <Select id="reg" options={region} />
      <Button name="Применить" />
    </div>
  );
}

export default Region;
