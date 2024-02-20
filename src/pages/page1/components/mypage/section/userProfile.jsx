import React, { useState, useEffect } from "react";
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
import axios from "axios";
import ImageCropperModal from "../imgCropModal";
import { UserContext } from "../../../../../context/Login";
import { useContext } from "react";


function UserProfile({ userData }) {
  const [message, setMessage] = useState(' ');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    status_message:""
  })

  useEffect(()=>{
    setMessage(userData[0].status_message);
    console.log(userData[0])
  },[])

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

  const user_context = useContext(UserContext);
  console.log(user_context);
  if (user_context && user_context.user_data) {
  console.log("사용자 정보: ", user_context.user_data.id); 
  } else {
  console.log("사용자 데이터가 없습니다.");
  }

  const handleModalSubmit = (status_message) => {
    // 상태 메시지를 상태로 설정
    setMessage(status_message);
    sendStatusMessage(status_message);
  };
  
  const sendStatusMessage = (status_message) => {
    const user_Id = user_context.user_data.id;
    const url = `users/${user_Id}/mypage/message`; 
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ status_message }); 
  
    axios.post(url, body, config)
      .then((res) => {
        if (res.data.success) {
          console.log('Status message upload successful', res.data);
        } 
      })
      .catch(err => {
        console.error('Error uploading status message', err);
      });
  };

/*const handleModalSubmit = (newStatusMessage) => {
  const updatedUserData = [...userData];
  updatedUserData[0].status_message = newStatusMessage;
  setUserData(updatedUserData);

  sendStatusMessage(updatedUserData[0].status_message);
};

const sendStatusMessage = (statusMessage) => {
  const user_Id = user_context.user_data.id;
  const url = `/users/${user_Id}/mypage/status`;
  const data = { status_message: statusMessage }; //

  axios.post(url, data)
    .then((response) => {
      console.log('Status message update successful', response.data);
    })
    .catch((error) => {
      console.error('Error updating status message', error);
    });
};*/

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
    

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setIsCropModalOpen(true);
    }
  };
  
  const handleImageCrop = (croppedImage) => {
    // Blob으로 변환
    fetch(croppedImage)
      .then(res => res.blob())
      .then(blob => {
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('files', blob, 'croppedImage.png');
        // 서버로 업로드
        uploadImg(formData); // 수정: formData를 직접 전달
      })
      .catch(err => {
        console.error('Error processing image', err);
      });
  
    // 모달 닫기
    setIsCropModalOpen(false);
  };
  
  const uploadImg = (formData) => {
    const user_Id = user_context.user_data.id;
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios.post(`users/${user_Id}/mypage/profile`, formData, config)
      .then((res) => {
        if (res.data.success) {
          console.log('Image upload successful', res.data);
        } 
      })
      .catch(err => {
        console.error('Error uploading image', err);
      });
  };
  
  return (
    <div className="user-profile">
      <div className="img-container">
        <div className="round-image">
        {selectedImage ? (
          <img src={selectedImage} alt="thumbnail" />
        ) : userData[0] && userData[0].profile_image ? (
          <img src={userData[0].profile_image} alt="profile" />
        ) : (
          <img src={profileImg} alt="default profile" />
        )}
      </div>
        <form>
          <input type="file" accept="image/*" onChange={handleFileChange} />
      {isCropModalOpen && (
        <ImageCropperModal
          isOpen={isCropModalOpen}
          onClose={() => setIsCropModalOpen(false)}
          src={selectedImage}
          onCrop={handleImageCrop}
        />
      )}
        </form>
      </div>
      <div className="userdata-container">
        <div className="last-tier">
          <strong>{userData[0].last_tier}</strong>
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
          {message ? <h5>{message}</h5> : <h5>...</h5>}
        </div>
        <button className="edit-button2" onClick={handleEditButtonClick}>
          <img src={flag} alt="flagIcon" />
          메시지 수정
        </button>
        <MypageModal
          value={values.status_message}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </div>
        <div className="userDetail-container">
          <div
            className="follower-count detail-item"
            onClick={goToMypageFollower}
          >
            <strong>팔로워: {userData[0].follower_num}</strong>
          </div>
          <div
            className="follow-count detail-item"
            onClick={goToMypageFollowing}
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
