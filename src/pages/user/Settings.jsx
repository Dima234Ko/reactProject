import { LinkButton } from "../../components/Link";

function Settings() {
  return (
    <div id="settings">
      <h2>Настройка</h2>
      <LinkButton name="Выбор региона" id="reg" to={`/region`} />
      <LinkButton name="Смена пароля" id="pass" to={`/changePassword`} />
    </div>
  );
}

export default Settings;
