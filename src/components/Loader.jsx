export function Loader({ progress }) {
  return (
    <div className="loader">
      <div className="spinner"></div>
      {progress !== undefined && (
        <div className="progress-text">
          {progress}%
        </div>
      )}
    </div>
  );
}
