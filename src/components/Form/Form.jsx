import { useEffect, useRef } from 'react';

export function FormInfo({ isFormOpen, closeForm, formData }) {
  const formRef = useRef(null);
  0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeForm]);

  const handleClose = () => {
    if (closeForm) closeForm();
  };

  if (!isFormOpen) return null;

  return (
    <div className="custom-component" ref={formRef}>
      <div className="close-btn" onClick={handleClose}>
        ×
      </div>
      <div
        className="input-container"
        style={{ maxHeight: '650px', overflowY: 'auto' }}
      >
        <div className="textForm">{formData}</div>
      </div>
    </div>
  );
}
