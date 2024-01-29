import React, { useState } from 'react'
import SideAd from '../../Home/components/advertisement/SideAd'
import Header from '../../Home/components/header/Header'
import '../components/mypage/mypage.scss';
import Notification_item from './notification_item';
import './notice.scss'

export default function Notification() {

  const [selectedButton, setSelectedButton] = useState("sentiment");
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const notificationsData = [
    {
      title: '코멘트포털의 코멘트 프로그래밍 하기',
      content: '새로운 답변이 달렸습니다: 환영합니다',
      date: '2023/12/18 15:13'
    },
  ]
  return (
    <div>
      <Header onLogoClick={handleButtonClick} />
    <div className='mypage-wrapper'>
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
        <div className="notifications-container">
          {notificationsData.map((notification, index) => (
          <Notification_item 
          key={index}
          title={notification.title}
          content={notification.content}
          date={notification.date}
        />
      ))}
    </div>
        </div>
        <div className="right">
          <SideAd />
        </div>
    </div>
    </div>
  )
}
