import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notification_icon from "../../../assets/icons/gravity-ui-comment.svg";
import tierIcon from "../../../assets/icons/solar-ranking-linear.svg";
import "./notice.scss";
import { NotificationCheck } from "../../../modules/api/search";
import { UserContext } from "../../../context/Login";

export default function NotificationItem({
  key,
  alarm_id,
  read_at,
  created_at,
  title,
  sentiment_id,
  content,
}) {
  const navigate = useNavigate();

  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  const userId = user_context.user_data.id;
  const isLoggedIn = user_context.user_data.isLogin;

  const handleItemClick = async () => {
    try {
      // 알림 확인 요청
      await NotificationCheck(userId, alarm_id); //key 부분을 alarm_id로 대체 필요 ====
      console.log("alarm_id: ", alarm_id);

      // 알림이 "댓글"인 경우 센티먼트 상세 페이지로 이동
      if (title.includes("댓글")) {
        navigate(`/sentiment/notification/${sentiment_id}/${title}`);
      }
      // 알림이 "티어"인 경우 마이페이지로 이동
      else if (title.includes("티어")) {
        navigate("/mypage");
      }
    } catch (error) {
      console.error("알림 확인 오류:", error);
      // 알림 확인에 실패한 경우에 대한 처리 추가
    }
  };

  // 조건에 따라 아이콘 선택
  const icon = title.includes("댓글")
    ? notification_icon
    : title.includes("티어")
    ? tierIcon
    : notification_icon;

  return (
    <div className="notification-item" onClick={handleItemClick}>
      <div className="notification-icon">
        <img src={icon} alt="Notification Icon" />
      </div>
      <div className="notification-content">
        <h3>{title}</h3>
        <p>{content}</p>
        <span className="notification-date">{created_at}</span>
      </div>
    </div>
  );
}
