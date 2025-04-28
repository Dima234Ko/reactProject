import ExpressButton from '../Button/ExpressButton';

function WarningForm({ onContinue, onCancel }) {
  return (
    <div className="textForm">
      <h2>Внимание</h2>
      <pre>Данный PON Serial указан в другой карточке US</pre>
      <div className="input-container">
        <ExpressButton
          onClick={onContinue}
          text="Продолжить"
          closeButton={false}
        />
        <ExpressButton onClick={onCancel} text="Завершить" closeButton={true} />
      </div>
    </div>
  );
}

export default WarningForm;
