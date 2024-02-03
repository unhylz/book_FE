import React, { useState } from "react";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Header from "../../../../pages/Home/components/header/Header";
import followersData from "../../../../modules/api/dummy_follower";
import "./mypage.scss";
import "../mypage/mypage_follower.scss";

export default function Mypage_follower() {
  const [followers, setFollowers] = useState(followersData);

  const [selectedButton, setSelectedButton] = useState("sentiment");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleFollowClick = (follower) => {
    // `follower` 객체의 유효성 검사
    if (!follower) {
      console.error("Invalid follower object");
      return;
    }

    const newFollowers = followers.map((f) => {
      if (f.name === follower.name) {
        return { ...f, isFollow: !f.isFollow };
      }
      return f;
    });
    setFollowers(newFollowers);

    if (follower.isFollow) {
      console.log(`${follower.name}를 팔로우했습니다.`);
    } else {
      console.log(`${follower.name} 팔로우를 취소했습니다.`);
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
            <h2>팔로워</h2>
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
                  onClick={() => handleFollowClick(follower, index)}
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
