/**
 * Получение названия региона по идентификатору
 * @param {string} reg - id региона
 */

export function getRegion(reg) {
  const regionId = Number(reg);
  switch (regionId) {
    case 1:
      return 'Костромская область';
    case 2:
      return 'Западная Якутия';
    case 3:
      return 'Тест';
    case 4:
      return 'Нерюнгри';
    default:
      return 'Регион не определен, необходимо изменить';
  }
}

/**
 * Получение id региона по наименованию
 * @param {string} name - Имя региона
 */

export function getRegionForName(name) {
  switch (name) {
    case 'Костромская обл.':
      return 1;
    case 'Западная Якутия':
      return 2;
    case 'Тест':
      return 3;
    case 'Нерюнгри':
      return 4;
    default:
      return null;
  }
}
