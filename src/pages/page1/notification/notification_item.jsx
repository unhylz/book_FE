import React from 'react';
import { useNavigate } from 'react-router-dom';
import notification_icon from '../../../assets/icons/gravity-ui-comment.svg';
import './notice.scss';

export default function NotificationItem({ id, title, date, content }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    // 여기서 id와 title을 사용하여 경로를 설정합니다.
    navigate(`/sentiment/${id}/${title}`);
  };

  return (
    <div className="notification-item" onClick={handleItemClick}>
      <div className="notification-icon">
        <img src={notification_icon} alt="Notification Icon" />
      </div>
      <div className="notification-content">
        <h4>{title}</h4>
        <p>{content}</p>
        <span className="notification-date">{date}</span>
      </div>
    </div>
  );
}