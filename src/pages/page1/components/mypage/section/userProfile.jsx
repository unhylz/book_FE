import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sentimentDummy } from "../../../../Home/components/sentiment/sentimentDummy";
import RookieIcon from "../../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../../assets/tiers/그랜드마스터.svg";
import "./userProfile.scss";
import flag from "../../../../../assets/icons/lets-icons-flag-finish-alt.svg";
import profileImg from "../../../../../assets/icons/ellipse-4.svg";
import MypageModal from "./mypageModal"; // 모달 컴포넌트를 import합니다

function UserProfile({ userData, handleImageChange }) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 관리합니다.

  const navigate = useNavigate();

  const goToMypageFollower = () => {
    navigate("../mypage_follower");
  };

  const goToMypageFollowing = () => {
    navigate("../mypage_following");
  };

  const handleEditButtonClick = () => {
    // 모달 열기
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleModalSubmit = (newMessage) => {
    setMessage(newMessage);
    alert("Message updated: " + newMessage);
  };

  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };

    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");

    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;

    return SelectedIcon;
  };

  async function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:3001/users/{user-id}/mypage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // 서버로부터의 응답 처리
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        // 여기에서 추가적인 상태 업데이트나 UI 반응을 처리할 수 있습니다.
      } else {
        // 서버 에러 처리
        console.error("Server error:", response);
      }
    } catch (error) {
      // 네트워크 에러 처리
      console.error("Network error:", error);
    }
  }

  return (
    <div className="user-profile">
      <div className="img-container">
        <div className="round-image">
          <img src={profileImg} alt="Profile" />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />
        </div>
        <button
          className="edit-button1"
          onClick={() => document.getElementById("imageInput").click()}
        >
          Edit
        </button>
      </div>
      <div className="userdata-container">
        <div className="last-tier">
          <strong>Season 1: Master</strong>
        </div>
        <div className="nameAndTier">
          <h2 className="name">{userData.name}</h2>
          <div className="tier">
            <img
              src={getTierIcon(userData.tier)}
              alt="userData.tier"
              className="tier-icon"
            />
          </div>
        </div>
        <p className="email">{userData.email}</p>
        <div className="message-edit">
          <div className="message-box">
            <h5>{message}</h5>
          </div>
          <button className="edit-button2" onClick={handleEditButtonClick}>
            <img src={flag} alt="flagIcon" />
            메시지 수정
          </button>
          {/* 모달 컴포넌트 */}
          <MypageModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />
        </div>
        <div className="userDetail-container">
          <div
            className="follower-count detail-item"
            onClick={goToMypageFollowing}
          >
            <strong>팔로워: {userData.follower}</strong>
          </div>
          <div
            className="follow-count detail-item"
            onClick={goToMypageFollower}
          >
            <strong>팔로우: {userData.follow}</strong>
          </div>
          <div className="user-tier detail-item">
            <strong>티어 : {userData.tier}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
