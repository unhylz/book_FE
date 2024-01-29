import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function MypageModal() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(''); // 메시지 상태 초기화
  const [tempMessage, setTempMessage] = useState(''); // 임시 메시지 상태

  const handleClose = () => {
    setShow(false);
    setTempMessage(message); // 모달을 닫을 때 임시 메시지를 현재 메시지로 리셋
  }
  
  const handleShow = () => {
    setShow(true);
    setTempMessage(message); // 모달을 열 때 임시 메시지를 현재 메시지로 설정
  }

  const handleSaveChanges = () => {
    if (tempMessage.length <= 40) {
        setMessage(tempMessage); // 부모 컴포넌트의 setMessage 함수를 호출
        alert('Message updated: ' + tempMessage);
        handleClose(); // 모달 닫기
      } else {
        alert('Message should be 40 characters or less.'); // 메시지 길이 검증
      }
  }

  const handleInputChange = (e) => {
    setTempMessage(e.target.value); // 입력 필드 값 변경 시 임시 메시지 업데이트
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>자기소개 (40자 이내)</Form.Label>
              <Form.Control
                type="text"
                value={tempMessage}
                onChange={handleInputChange}
                maxLength="40"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MypageModal;