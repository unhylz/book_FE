import React, { useState, useEffect } from 'react';
import './mypage.scss';
import Header from '../../../../pages/Home/components/header/Header'
import postdata from '../../../../modules/api/dummy_posts';
import UserProfile  from '../mypage/section/userProfile';
import UserStats from '../mypage/section/userstats';
import UserPosts from '../mypage/section/userpost';
import Pagination from '../mypage/section/pagenation';
import SideAd from '../../../Home/components/advertisement/SideAd';



  function MyPage() {

    const [selectedButton, setSelectedButton] = useState("sentiment");
    const handleButtonClick = (button) => {
      setSelectedButton(button);
    };
    
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      // 여기에서 팔로우 상태를 서버에 업데이트할 수도 있습니다.
    };


    useEffect(() => {
      // 홈 페이지 진입 시 기본으로 sentiment 버튼이 선택된 상태로 표시
      setSelectedButton("sentiment");
    }, []);

    const [posts, setPosts] = useState(postdata);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    
    
    const userData = {
        name: 'Paul',
        email: 'abc1234@naver.com',
        tier: 'Grand Master',
        points: 1102,
        likes: 511,
        follower:21,
        follow:55,
        comments: 432,
        imageUrl: '사용자_이미지_URL'
    };
  
    const handleImageChange = (e) => {
      
    };

  
  
    return (
      <div>
        <Header onLogoClick={handleButtonClick} />
        <div className='mypage-wrapper'>
          <div className="left">
            <SideAd />
          </div>
          <div className="mypage-container">
            {/* 페이지 1일 때만 UserProfile과 UserStats 렌더링 */}
            {currentPage === 1 && (
              <>
                <UserProfile userData={userData} handleImageChange={handleImageChange} />
                <UserStats userData={userData} />
                {/* 내 페이지가 아닐 때만 팔로우 버튼 표시 */}
                <button className={`follow-button ${isFollowing ? 'following' : 'not-following'}`} onClick={toggleFollow}>
                {isFollowing ? "언팔로우" : "팔로우"}
                </button>
              </>
            )}
            
            {/* 모든 페이지에서 UserPosts 렌더링 */}
            <UserPosts currentPosts={currentPosts} />
            
            {/* 모든 페이지에서 Pagination 렌더링 */}
            <Pagination pageNumbers={pageNumbers} paginate={paginate} />
          </div>
          <div className="right">
            <SideAd />
          </div>
        </div>
      </div>
    );
  }
  
  
  export default MyPage;