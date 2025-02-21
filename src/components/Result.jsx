function Result({ data }) {
  const cleanedData = removeFields(data); // Удаляем ненужные поля
  const cleanedString = JSON.stringify(cleanedData, null, 2); // Преобразуем в строку JSON

  // Определяем стиль для текста
  const textStyle = data.success === false ? { color: "red" } : {};

  return (
    <div className="result">
      <pre style={textStyle}>{removeQuotes(cleanedString)}</pre>
    </div>
  );
}

function removeQuotes(jsonString) {
  // Удаляем все пробелы и символы новой строки
  return jsonString
    .replace(/[\{\},]/g, "")
    .replace(/^[\s\n]+/, "")
    .replace(/"/g, "");
}

function removeFields(data) {
  const {
    type,
    serialNewNtu,
    success,
    create_login_US,
    add_descr,
    tag_assign,
    ...newData
  } = data;
  return newData;
}

export default Result;
