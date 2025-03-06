import { requestAPI } from "./api";

//Записать данные в ЮС
export async function setInfoToUs(userLogin, surname, name, patronymic, phone, workFromRedux) {
    let body = {
      userLogin: userLogin,
      userFullName: `${surname} ${name} ${patronymic}`,
      userPhone: phone,
    };
    try {
      await requestAPI("POST", `${workFromRedux}/setInfoToUs`, body);
    } catch {
      throw error;
    }
}