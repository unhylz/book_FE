import React, { useState, useEffect, useContext } from "react";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Header from "../../../../pages/Home/components/header/Header";
import axios from "axios";
import "./mypage.scss";
import "../mypage/mypage_follower.scss";
import AcountModalContainer from "../../../../container/AcountModalContainer";
import { UserContext } from "../../../../context/Login";
import xIcon from "../../../../assets/icons/xIcon.svg"

export default function Mypage_follower() {
  const [followers, setFollowers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("sentiment");

  const [modalState, setModalState] = useState(null);
  const [modal, setModal] = useState(false);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const user_context = useContext(UserContext);
  console.log(user_context); 
  if (user_context && user_context.user_data) {
  console.log("사용자 정보: ", user_context.user_data.id); 
  } else {
  console.log("사용자 데이터가 없습니다.");
  }

  useEffect(() => {
    const user_Id = user_context.user_data.id;
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`/users/${user_Id}/follower`);
        setFollowers(response.data.nicknames);
        console.log("팔로워 데이터:", response.data);
      } catch (error) {
        console.error("팔로워 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchFollowers();
  }, []);

      const handleFollowClick = async (follower) => {
        const user_Id = user_context.user_data.id;
        if (!follower) {
          console.error("유효하지 않은 객체임");
          return;
        }
      
        try {
          const response = await axios.post(`/users/${user_Id}/follow`, {
            followingId: follower.user_id, // 팔로우하려는 사용자의 ID
            isFollow: follower.follow_status === "1" ? false : true, // 팔로우 상태 반전
          });
          // 요청 성공 시, 로그 메시지 출력 및 상태 업데이트
          if (response.data.follow_status === "follow" || response.data.follow_status === "following") {
            const newFollowStatus = response.data.follow_status === "following" ? "1" : "0";
            console.log(`${follower.nickname}를 팔로우했습니다.`);
            // 팔로워 목록 상태 업데이트
              setFollowers(followers.map(f => {
                if (f.user_id === follower.user_id) {
                  return { ...f, follow_status: newFollowStatus };
                }
                return f;
              }));
            } else {
              alert("팔로우 상태 변경 실패");
            }
          } catch (error) {
            console.error("팔로우 요청 중 오류 발생:", error);
          }
        };

  useEffect(() => {
    console.log("모달 상태 변경???: ", modalState);

    if (modalState != null) {
      setModal(1);
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
          <div className="user-list">
            <h2>팔로워</h2>
            {followers.length === 0 ? (
              <div className="noSentiment">
              <img src={xIcon}/>
              <p>팔로워가 없습니다.</p>
              </div>
            ) : 
              followers.map((follower, index) => (
                <div key={index} className="follower-card">
                  <img
                    src={follower.profile_image}
                    alt={follower.nickname}
                    className="follower-image"
                  />
                  <div className="follower-info">
                    <h3 className="follower-name">{follower.nickname}</h3>
                    <p className="follower-bio">{follower.status_message}</p>
                  </div>
                  <button
                    onClick={() => handleFollowClick(follower)}
                    className={`follower-status ${follower.follow_status === "1" ? "followed" : "not-followed"}`}
                  >
                    {follower.follow_status === "1" ? "팔로잉" : "팔로우"} 
                  </button>
                </div>
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
