import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RookieIcon from "../../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../../assets/tiers/그랜드마스터.svg";
import profileImg from "../../../../../assets/icons/profileImg.svg.svg"
import "./userProfile.scss"
import flag from "../../../../../assets/icons/lets-icons-flag-finish-alt.svg"
import MypageModal from './mypageModal';
import FileInput from "./FileInput";
import axios from "axios";

function UserProfile({ userData }) {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 관리합니다.

  const [fileReaderThumbnail, setFileReaderThumbnail] = useState();
  const [URLThumbnail, setURLThumbnail] = useState();

  const createImageURL = (fileBlob) => { 
    if(URLThumbnail)URL.revokeObjectURL(URLThumbnail);
    const url = URL.createObjectURL(fileBlob);

    setURLThumbnail(url);
  };


  const onImageChange = (e) => {
    const { files } = e.target;

    if (!files || !files[0]) return;

    const uploadImage = files[0];

    createImageURL(uploadImage);
  };

  const uploadImage = () => {
    if (!files) return;

    const formData = new FormData();
    formData.append('image', files);

     axios.patch("/users/1/mypage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        alert("서버에 등록이 완료되었습니다!");
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
 
  

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
    return tierIcons[tier];
  };
    


  return (
    <div className="user-profile">
      <div className="img-container">
        <div className="round-image">
        {URLThumbnail ? (
            <img src={URLThumbnail} alt="thumbnail" />
          ) : (
            <img src={userData[0].profile_image}/>
          )}
        </div>
        <FileInput label="Edit" onChange={onImageChange} />
        <button onClick={uploadImage}>upload</button>
      </div>
      <div className="userdata-container">
        <div className="last-tier">
          <strong>Season 1: Master</strong>
        </div>
        <div className="nameAndTier">
          <h2 className="name">{userData[0].nickname}</h2>
          <div className="tier">
            <img
              src={getTierIcon(userData[0].tier)}
              alt="userData.tier"
              className="tier-icon"
            />
          </div>
        </div>
        <p className="email">{userData[0].email}</p>
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
            <strong>팔로워: {userData[0].follower_num}</strong>
          </div>
          <div
            className="follow-count detail-item"
            onClick={goToMypageFollower}
          >
            <strong>팔로우: {userData[0].following_num}</strong>
          </div>
          <div className="user-tier detail-item">
            <strong>티어 : {userData[0].tier}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
