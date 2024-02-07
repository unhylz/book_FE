import React, { useState, useEffect } from "react";
import Header from "../../Home/components/header/Header";
import SideAd from "../../Home/components/advertisement/SideAd";
import Footer from "../../Home/components/footer/Footer";
import NotificationItem from "../notification/notification_item";
import AcountModalContainer from "../../../container/AcountModalContainer";
import axios from "axios";

export default function Notification() {
  const [comments, setComments] = useState(["플러터 어렵나요?"]); // 댓글 상태
  const [notificationsData, setNotificationsData] = useState([]); // 알림 상태
  const [modalState, setModalState] = useState(null);
  const [isNotified, setIsNotified] = useState(false);
  const [userState, setUserstate] = useState(1);

  useEffect(() => {
    axios.get(`users/${userState}/notifications`)
    .then(response => {
      setNotificationsData(response.data);
      setIsNotified(true);
    })
    .catch(error => console.error(error));
  }, []);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleNotificationClick = () => {
    setIsNotified(false); // 알림 클릭 시, 알림 여부 상태 변경
  };

  const handleButtonClick = () => {
    // 로고 클릭 핸들러 로직
  };

  return (
    <div>
      <Header onLogoClick={handleButtonClick} setModalState={setModalState} />
      <div className="mypage-wrapper">
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
      {modalState && <AcountModalContainer state={modalState} />}
      <Footer />
    </div>
  );
}
