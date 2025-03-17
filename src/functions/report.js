import { requestAPI } from "./api";

// Функция для замены значений headerWorkName и обработки idUserSideCard
function translateHeaderWorkName(data) {
  const translations = {
    newConnection: "Новое подключение",
    "Equipment shutdown": "Снятие оборудования",
    malfunction: "Неисправность",
  };

  return data.map(item => ({
    ...item,
    headerWorkName: translations[item.headerWorkName] || item.headerWorkName,
    idUserSideCard: item.idUserSideCard === -1 ? "" : item.idUserSideCard,
  }));
}

export async function getReport() {
  let data = await requestAPI("GET", "logs/small?size=100&page=0");
  const content = data.content;
  const translatedContent = translateHeaderWorkName(content);
  return translatedContent;
}