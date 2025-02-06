function Result({ data }) {
    return (
      <div className="result">
        <h3>Результат запроса</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
  
  export default Result;
  