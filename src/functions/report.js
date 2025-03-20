import { requestAPI } from "./api";
import { setPage } from "../store/actions/pageLogTaskActions";

function translateHeaderWorkName(data) {
  const translations = {
    "newConnection": "Новое подключение",
    "Equipment shutdown": "Снятие оборудования",
    "malfunction": "Неисправность",
  };

  return data.map(item => ({
    ...item,
    headerWorkName: translations[item.headerWorkName] || item.headerWorkName,
    idUserSideCard: item.idUserSideCard === -1 ? "" : item.idUserSideCard,
  }));
}

export async function getReport(dispatch, 
  task,
  activePage, 
  startDate, 
  endDate, 
  selectedUser, 
  ponSerial,
  channel,
  regionTask) {

  let url = null;  
  
  if (task){  
    url = `logs/smallTasks?size=50&page=${activePage - 1}`;
  } else {
    url = `logs/smallWifi?size=50&page=${activePage - 1}`;

    if (channel) {
      url += `&channel=${encodeURIComponent(channel)}`;
    }
  }

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
    if (regionTask) {
      url += `&region=${encodeURIComponent(regionTask)}`;
    }



  let data = await requestAPI("GET", url);
  dispatch(setPage(data.totalPages + 1));
  let content = data.content;
  if (task){  
    content = translateHeaderWorkName(content);
  }
  return content;
}