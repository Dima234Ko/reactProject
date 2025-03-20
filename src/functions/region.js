export function getRegion(reg) {
  const regionId = Number(reg); 
  switch (regionId) {
    case 1:
      return "Костромская область";
    case 2:
      return "Западная Якутия";
    case 3:
      return "Тест";
    case 4:
      return "Нерюнгри";
    default:
      return "Регион не определен, необходимо изменить";
  }
}

export function getRegionForName(name) {
  switch (name) {
    case "Костромская обл.":
      return 1;
    case "Западная Якутия":
      return 2;
    case "Тест":
      return 3;
    case "Нерюнгри":
      return 4;
    default:
      return null;
  }
}
