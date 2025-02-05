import { requestAPI } from "./api";

export async function authorization () {
    let action = 'login'
    let logPass = {
      "login": "esipov",
      "password": "1111"
    }

    let data = await requestAPI ('POST', action, logPass);
    alert(data.result);
}