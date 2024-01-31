import React, { useState, useEffect } from 'react';
import Header from '../../Home/components/header/Header';
import SideAd from '../../Home/components/advertisement/SideAd';
import NotificationItem from '../notification/notification_item';
import CommentItem from '../../SentimentDetail/Comment/Comment';


export default function Notification() {
  const [comments, setComments] = useState(['플러터 어렵나요?']); // 댓글 상태
  const [notificationsData, setNotificationsData] = useState([]); // 알림 상태

  // 댓글이 변경될 때마다 알림 데이터 업데이트
  useEffect(() => {
    if (comments.length > 0) {
      const newNotification = {
        id: notificationsData.length + 1,
        title: "새 댓글",
        date: new Date().toLocaleDateString(),
        content: comments[comments.length - 1],
      };
      setNotificationsData([...notificationsData, newNotification]);
    }
  }, [comments]);

  // 댓글 추가 함수 (실제 사용 시에는 API 호출 등을 통해 구현)
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleButtonClick = () => {
    // 로고 클릭 핸들러 로직
  };

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
              <NotificationItem 
                key={index}
                id={notification.id}
                title={notification.title}
                date={notification.date}
                content={notification.content}
              />
            ))}
          </div>
        </div>
        <div className="right">
          <SideAd />
        </div>
      </div>
    </div>
  );
}
