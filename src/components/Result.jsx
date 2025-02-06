function Result({ data }) {
  return (
    <div className="result">
      <pre>{removeQuotes(JSON.stringify(data, null, 2))}</pre>
    </div>
  );
}

export default Result;

function removeQuotes(jsonString) {
  return jsonString.replace(/[\{\},]/g, "").replace(/"/g, "");
}
