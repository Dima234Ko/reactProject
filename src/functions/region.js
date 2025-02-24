export function getRegion(reg) {
  const regionId = Number(reg); // Приводим reg к числу
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
