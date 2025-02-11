function Result({ data }) {
  const cleanedData = removeFields(data);  // Удаляем ненужные поля
  const cleanedString = JSON.stringify(cleanedData, null, 2);  // Преобразуем в строку JSON

  // Определяем стиль для текста
  const textStyle = data.success === false ? { color: 'red' } : {};

  return (
    <div className="result">
      <pre style={textStyle}>{removeQuotes(cleanedString)}</pre> 
    </div>
  );
}

function removeQuotes(jsonString) {
  return jsonString.replace(/[\{\},]/g, "").replace(/"/g, "");
}

function removeFields(data) {
  const { type, serialNewNtu, success, ...newData } = data;
  return newData;
}

export default Result;
