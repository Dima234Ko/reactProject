import { requestAPI } from "./api";

export async function authorization(login, password) {
  let action = "login";
  let logPass = {
    login: login,
    password: password,
  };

  let data = await requestAPI("POST", action, logPass);
  alert(data.result);
}
