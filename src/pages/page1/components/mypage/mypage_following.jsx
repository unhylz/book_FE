import React, { useState, useEffect } from "react";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Header from "../../../../pages/Home/components/header/Header";
import axios from "axios";
import "./mypage.scss";
import "../mypage/mypage_follower.scss";

export default function Mypage_following() {
  const [followers, setFollowers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [followStaus, setFollowStatus] = useState([])

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get("/users/2/following");
        setFollowers(response.data.nicknames);
        console.log("팔로잉 데이터:", response.data);
      } catch (error) {
        console.error("팔로잉 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchFollowers();
  }, []);



  const handleFollowClick = async (follower) => {
    if (!follower) {
      console.error("유효하지 않은 객체임");
      return;
    }
    try {
      const response = await axios.post(`/users/2/follow`, {
        followingId: follower.user_id, // user_id를 사용
        isFollow: follower.follow_status === "1" ? 0 : 1,
      });
  
      if (response.data.follow_status === "1") {
        console.log(`${follower.nickname}를 팔로우했습니다.`);
      } else {
        console.log(`${follower.nickname} 팔로우를 취소했습니다.`);
      }
  
      const updatedFollowStatus = response.data.follow_status;
      setFollowers(followers.map(f => {
        if (f.user_id === follower.user_id) { 
          return { ...f, follow_status: updatedFollowStatus };
        }
        return f;
      }));
    } catch (error) {
      console.error("팔로우 요청 중 오류 발생:", error);
    }
  };
  
  return (
    <div>
      <Header onLogoClick={handleButtonClick}/>
      <div className="mypage-wrapper">
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          <div className="user-list">
            <h2>팔로잉</h2>
            {followers.length === 0 ? (
              <p>팔로워가 없습니다.</p>
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
                  className={`follower-status ${
                    follower.follow_status === "1" ? "followed" : "not-followed"
                  }`}
                >
                  {follower.follow_status === "1" ? "팔로우" : "팔로잉"}
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
