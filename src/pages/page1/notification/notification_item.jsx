import React from 'react';
import { useNavigate } from 'react-router-dom';
import notification_icon from '../../../assets/icons/gravity-ui-comment.svg';
import tierIcon from "../../../assets/icons/solar-ranking-linear.svg"
import './notice.scss';

export default function NotificationItem({ read_at, title, date, content, sentiment_id }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (title.includes("댓글")) {
      navigate(`/sentiment/${sentiment_id}/${read_at}`);
    } else if (title.includes("티어")) {
      navigate("/mypage"); 
    };
  };

  // 조건에 따라 아이콘 선택
  const icon = title.includes("댓글") ? notification_icon : title.includes("티어") ? tierIcon : notification_icon;

  return (
    <div className="notification-item" onClick={handleItemClick}>
      <div className="notification-icon">
        <img src={icon} alt="Notification Icon" />
      </div>
      <div className="notification-content">
        <h4>{title}</h4>
        <p>{content}</p>
        <span className="notification-date">{date}</span>
      </div>
    </div>
  );
}
