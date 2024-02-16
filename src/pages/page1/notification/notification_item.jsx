import React from 'react';
import { useNavigate } from 'react-router-dom';
import notification_icon from '../../../assets/icons/gravity-ui-comment.svg';
import './notice.scss';

export default function NotificationItem({ read_at, title, date, content }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (title.includes("댓글")) {
      navigate(`/sentiment/${read_at}/${title}`);
    } else if (title.includes("티어")) {
      navigate("/mypage"); 
    };
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