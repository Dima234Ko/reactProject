export function disableNTU (isChecked, selectedRadioOption, radioOptions, serial) {
        let checkboxText = "";
        let radioText = "";
    
        // Определяем текст выбранного чекбокса
        if (isChecked) {
          checkboxText = "Неисправность оборудования";
        } else  {
          checkboxText = "Отключение абонентской линии";
        }
    
        // Определяем текст выбранной радиокнопки
        if (isChecked && selectedRadioOption) {
          radioText = radioOptions[selectedRadioOption];
        } else {
          radioText = "Радиокнопка не выбрана";
        }
    
        console.log(`Для ${serial}:`);
        console.log(`1. Выбранный чекбокс: ${checkboxText}`);
        console.log(`2. Выбранная радиокнопка: ${radioText}`);
}