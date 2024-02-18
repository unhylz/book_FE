import React, { useState, useEffect, useContext } from "react";
import Header from "../../Home/components/header/Header";
import SideAd from "../../Home/components/advertisement/SideAd";
import Footer from "../../Home/components/footer/Footer";
import NotificationItem from "../notification/notification_item";
import AcountModalContainer from "../../../container/AcountModalContainer";
import axios from "axios";
import { UserContext } from "../../../context/Login";

export default function Notification() {
  const [comments, setComments] = useState([]); 
  const [notificationsData, setNotificationsData] = useState([]); 
  const [isNotified, setIsNotified] = useState(false);
  const [userState, setUserstate] = useState(1);

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  const user_context = useContext(UserContext);
  console.log(user_context);
  if (user_context && user_context.user_data) {
  console.log("사용자 정보: ", user_context.user_data.id); 
  } else {
  console.log("사용자 데이터가 없습니다.");
  }

  useEffect(() => {
    const user_Id = user_context.user_data.id;
    axios
      .get(`users/${user_Id}/notifications`)
      .then((response) => {
        setNotificationsData(response.data);
        setIsNotified(true);
      })
      .catch((error) => console.error(error));
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

  useEffect(() => {
    console.log("모달 상태 변경???: ", modalState);

    if (modalState != null) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [modalState]);

  return (
    <div>
      {modal && modalState && (
        <AcountModalContainer
          state={modalState}
          setModalState={setModalState}
        />
      )}
      <Header
        onLogoClick={handleButtonClick}
        setModalState={setModalState}
        setModal={setModal}
      />
      <div className="mypage-wrapper">
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          <div className="notifications-container">
            {notificationsData.map((notification, index) => (
              <NotificationItem
                key={index}
                id={notification.sentiment_id}
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
      <Footer />
    </div>
  );
}
