import React from 'react'
import notification_icon from '../../../assets/icons/gravity-ui-comment.svg'
import './notice.scss'

export default function NotificationItem({ title, date, content }) { // 인자를 객체로 받도록 수정
  return (
    <div className="notification-item">
      <div className="notification-icon">
        <img src={notification_icon} alt="Notification Icon" /> {/* alt 속성 추가 */}
      </div>
      <div className="notification-content">
        <h4>{title}</h4>
        <p>{content}</p>
        <span className="notification-date">{date}</span>
      </div>
    </div>
  )
}