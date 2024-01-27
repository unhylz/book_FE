import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function UserProfile({ userData, handleImageChange }) {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const goToMypageFollower = () => {
    navigate('../mypage_follower');
  };

  const goToMypageFollowing = () => {
    navigate('../mypage_following');
  };

  const handleEditButtonClick = () => {
    const newMessage = prompt('40자 이내로 자기소개를 해주세요~:', message);
    if (newMessage && newMessage.length <= 40) {
      setMessage(newMessage);
      alert('Message updated: ' + newMessage);
    }
  };

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('/upload-image-endpoint', { // '/upload-image-endpoint'을 실제 엔드포인트로 변경해야 합니다.
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // 서버로부터의 응답 처리
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        // 여기에서 추가적인 상태 업데이트나 UI 반응을 처리할 수 있습니다.
      } else {
        // 서버 에러 처리
        console.error('Server error:', response);
      }
    } catch (error) {
      // 네트워크 에러 처리
      console.error('Network error:', error);
    }
  }
  
  return (
    <div className="user-profile">
    <div className='img-container'>
      <div className="round-image">
        <img src={userData.imageUrl} alt="Profile"/>
        <input 
          type="file" 
          id="imageInput" 
          hidden="hidden" 
          onChange={handleImageChange} 
        />
      </div>
      <button className="edit-button1" onClick={() => document.getElementById('imageInput').click()}>
        Edit
      </button>
    </div>
    <div className='userdata-container'>
      <h2 className="name">{userData.name}</h2>
      <p className="email">{userData.email}</p>
      <div className='userDetail-container'>
      <div className='follower-count detail-item' onClick={goToMypageFollowing}>
       <span>팔로워: {userData.follower}</span >
      </div>
      <div className='follow-count detail-item' onClick={goToMypageFollower}>
      <span>팔로우: {userData.follow}</span>
      </div>
      <div className="user-tier detail-item">
      <span>{userData.tier}</span>
      </div>
      </div>
      <div className='message-edit'>
        <h5>{message}</h5>
        <button className="edit-button2" onClick={handleEditButtonClick}>
          메시지 수정
        </button>
      </div>
    </div>
  </div>
  
);
}
export default UserProfile;