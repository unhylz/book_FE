import React, { useState } from "react";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Header from "../../../../pages/Home/components/header/Header";
import followersData from "../../../../modules/api/dummy_follower";
import "./mypage.scss";
import "../mypage/mypage_follower.scss";
import ellipse4 from "../../../../assets/followers/ellipse-4.svg";
import axios from "axios";

export default function Mypage_follower() {
  const [followers, setFollowers] = useState(followersData);
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const userId = "123"; // 실제 사용자 ID로 대체해야 합니다.

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleFollowClick = async (follower) => {
    if (!follower) {
      console.error("Invalid follower object");
      return;
    }

    try {
      // 팔로우 상태 업데이트를 서버에 요청
      const response = await axios.post('http://localhost:3000/users/{user-id}/follow', {
        followerId: follower.id, // 팔로우 대상 사용자의 ID
        isFollow: !follower.isFollow, // 현재 팔로우 상태를 반전시킵니다.
      });
      const response = await axios.post(
        "http://localhost:3001/users/{user-id}/follow",
        {
          followerId: follower.id, // 팔로우 대상 사용자의 ID
          isFollow: !follower.isFollow, // 현재 팔로우 상태를 반전시킵니다.
        }
      );

      if (response.data.follow_status === "Follow") {
        console.log(`${follower.name}를 팔로우했습니다.`);
      } else {
        console.log(`${follower.name} 팔로우를 취소했습니다.`);
      }

      // 팔로우 상태를 업데이트합니다.
      const newFollowers = followers.map((f) => {
        if (f.id === follower.id) {
          return { ...f, isFollow: !follower.isFollow };
        }
        return f;
      });
      setFollowers(newFollowers);
    } catch (error) {
      console.error("팔로우 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <Header onLogoClick={handleButtonClick} />
      <div className="mypage-wrapper">
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          <div className="user-list">
            <h2>팔로잉</h2>
            {followers.map((follower, index) => (
              <div key={index} className="follower-card">
                <img
                  src={follower.imageUrl}
                  alt={follower.name}
                  className="follower-image"
                />
                <div className="follower-info">
                  <h3 className="follower-name">{follower.name}</h3>
                  <p className="follower-bio">{follower.bio}</p>
                </div>
                <button
                  onClick={() => handleFollowClick(follower)}
                  className={`follower-status ${
                    follower.isFollow ? "followed" : "not-followed"
                  }`}
                >
                  {follower.isFollow ? "팔로우" : "팔로잉"}
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
