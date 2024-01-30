import React, { useState } from 'react';
import "./mypageModal.scss"

function MypageModal({ isOpen, onClose, onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.length <= 40) {
      onSubmit(inputValue);
      onClose();
    } else {
      alert('입력은 40자 이내로 제한됩니다.');
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>메시지 수정</h2>
          <input
            type="text"
            placeholder="40자 이내로 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    )
  );
}

export default MypageModal;
