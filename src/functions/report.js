import { requestAPI } from "./api";
import { setPage } from "../store/actions/pageLogActions";

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

export async function getReport(dispatch, 
  activePage, 
  startDate, 
  endDate, 
  selectedUser, 
  ponSerial) {
 
  let url = `logs/small?size=50&page=${activePage - 1}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate + ' 00:00')}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate + ' 23:59')}`;
  }
  if (selectedUser) {
    url += `&login=${encodeURIComponent(selectedUser)}`;
  }
  if (ponSerial) {
    url += `&ponSerial=${encodeURIComponent(ponSerial)}`;
  }

  let data = await requestAPI("GET", url);
  dispatch(setPage(data.totalPages + 1));
  const content = data.content;
  const translatedContent = translateHeaderWorkName(content);
  return translatedContent;
}