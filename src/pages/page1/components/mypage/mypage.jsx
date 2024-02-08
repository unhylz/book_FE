import React, { useState, useEffect } from "react";
import "./mypage.scss";
import axios from "axios";
import Header from "../../../../pages/Home/components/header/Header";
import UserProfile from "../mypage/section/userProfile";
import UserStats from "../mypage/section/userstats";
import UserPosts from "../mypage/section/userpost";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Footer from "../../../../pages/Home/components/footer/Footer";
import AcountModalContainer from "../../../../container/AcountModalContainer";

function MyPage() {
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const [modalState, setModalState] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/users/1/mypage`);
      setUserData(response.data);
      console.log(response.data);
    }
     catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("HTTP 400 Bad Request 오류 발생");
          if (error.response.data && error.response.data.errorCode) {
            console.log("오류 코드:", error.response.data.errorCode);
          }
          if (error.response.data && error.response.data.message) {
            console.log("오류 메시지:", error.response.data.message);
          }
        } else {
          console.log("HTTP 오류 발생:", error.response.status);
        }
      } else {
        console.error("서버 응답 오류 정보 없음");
      }
    }
    
  };

  useEffect(() => {
    setSelectedButton("sentiment");
    fetchUserData();
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const toggleFollow = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Header onLogoClick={handleButtonClick} setModalState={setModalState} />
      <div className="mypage-wrapper">
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          {userData ? (
            <>
              <UserProfile userData={userData} />
              <button
                className={`follow-button ${
                  isFollowing ? "following" : "not-following"
                }`}
                onClick={toggleFollow}
              >
                {isFollowing ? "언팔로우" : "팔로우"}
              </button>
              <UserStats userData={userData} />
            </>
          ) : (
            <p>사용자 데이터를 불러오는 중...</p>
          )}
          <UserPosts currentPosts={currentPosts} />
        </div>
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer />
      {modalState && <AcountModalContainer state={modalState} />}
    </div>
  );
}

export default MyPage;