import React, { useState, useEffect } from 'react';
import './mypage.scss';
import axios from 'axios';
import Header from '../../../../pages/Home/components/header/Header';
import postdata from '../../../../modules/api/dummy_posts';
import UserProfile from '../mypage/section/userProfile';
import UserStats from '../mypage/section/userstats';
import UserPosts from '../mypage/section/userpost';
import SideAd from '../../../Home/components/advertisement/SideAd';
import Footer from '../../../../pages/Home/components/footer/Footer'

function MyPage() {
  const [selectedButton, setSelectedButton] = useState("sentiment");
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState(postdata);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const userData = {
    name: 'Paul',
    email: 'abc1234@naver.com',
    tier: '그랜드마스터',
    points: 1102,
    likes: 511,
    follower: 21,
    follow: 55,
    comments: 432,
    imageUrl: '사용자_이미지_URL'
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const toggleFollow = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  useEffect(() => {
    setSelectedButton("sentiment");
  }, []);

  

  return (
    <div>
      <Header onLogoClick={handleButtonClick} />
      <div className='mypage-wrapper'>
        <div className="left">
          <SideAd />
        </div>
        <div className="mypage-container">
          {currentPage === 1 && (
            <>
              <UserProfile userData={userData} />
              <button className={`follow-button ${isFollowing ? 'following' : 'not-following'}`} onClick={toggleFollow}>
                {isFollowing ? "언팔로우" : "팔로우"}
              </button>
              <UserStats userData={userData} />
            </>
          )}  
          <UserPosts currentPosts={currentPosts} />
        </div>
        <div className="right">
          <SideAd />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyPage;
