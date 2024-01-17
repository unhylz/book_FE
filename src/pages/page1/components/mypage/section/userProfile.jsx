import React, { useState } from 'react';

function UserProfile({ userData, handleImageChange }) {
  const [message, setMessage] = useState('');

  const handleEditButtonClick = () => {
    const newMessage = prompt('Modify your message (40 characters max):', message);
    if (newMessage && newMessage.length <= 40) {
      setMessage(newMessage);
      alert('Message updated: ' + newMessage);
    }
  };
  
  return (
      <div className="user-profile">
        <div className='img-container'>
        <div className="user-img">
          <img src={userData.imageUrl} alt="Profile" className="round-image"/>
          <input 
            type="file" 
            id="imageInput" 
            hidden="hidden" 
            onChange={handleImageChange} 
          />
          <button className="edit-button" onClick={() => document.getElementById('imageInput').click()}>
            Edit
          </button>
          </div>
        </div>
        <div className='user-container'>
        <h2 className="name">{userData.name}</h2>
        <div className="tier">{userData.tier}</div>
        <p className="email">{userData.email}</p>
        <button className="edit-button" onClick={handleEditButtonClick}>
          메시지 수정
        </button>
        <div className="user-message">
          <h6>{message}</h6>
          </div>
          </div>
  </div>
);
}
export default UserProfile;