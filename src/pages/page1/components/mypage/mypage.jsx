import React, { useState, useEffect } from "react";
import "./mypage.scss";
import axios from "axios";
import Header from "../../../../pages/Home/components/header/Header";
import postdata from "../../../../modules/api/dummy_posts";
import UserProfile from "../mypage/section/userProfile";
import UserStats from "../mypage/section/userstats";
import UserPosts from "../mypage/section/userpost";
import SideAd from "../../../Home/components/advertisement/SideAd";
import Footer from "../../../../pages/Home/components/footer/Footer";
import AcountModalContainer from "../../../../container/AcountModalContainer";

function MyPage() {
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState(postdata);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const [modalState, setModalState] = useState(null);
  const [userData, setUserData] = useState(null); 

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://3.37.54.220:3000/users/{user-id}/mypage`); 
      setUserData(response.data); // 서버에서 받은 데이터를 상태에 저장
    } catch (error) {
      console.error("사용자 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    setSelectedButton("sentiment");
    fetchUserData(); 
  }, []);

  /*const userData = {
    name: "Paul",
    email: "abc1234@naver.com",
    tier: "그랜드마스터",
    points: 1102,
    likes: 511,
    follower: 21,
    follow: 55,
    comments: 432,
    imageUrl: "사용자_이미지_URL",
  };*/

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const toggleFollow = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  useEffect(() => {
    setSelectedButton("sentiment");
  }, []);

  const renderPageContent = () => {
    return (
      <>
        {currentPage === 1 && (
          <>
            <UserProfile userData={userData} />
            <UserStats userData={userData} />
          </>
        )}
        <UserPosts currentPosts={currentPosts} />
      </>
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // 새 페이지에 따라 게시물 업데이트 로직 필요
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
            // 데이터가 로드되는 동안 사용자에게 로딩 메시지나 표시기를 보여줄 수 있습니다.
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
