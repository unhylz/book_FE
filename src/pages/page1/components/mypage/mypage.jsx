import React, { useState } from 'react';
import './mypage.scss';
import postdata from '../../../../modules/api/dummy_posts';
import UserProfile from '../mypage/section/userProfile';
import UserStats from '../mypage/section/userstats';
import UserPosts from '../mypage/section/userpost';
import Pagination from '../mypage/section/pagenation';


  // Rest of the pagination logic...

  function MyPage() {
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
        comments: 432,
        imageUrl: '사용자_이미지_URL'
    };
  
    const handleImageChange = (e) => {
      
    };
  
    return (
      <div className="mypage-container">
        <UserProfile userData={userData} handleImageChange={handleImageChange} />
        <UserStats userData={userData} />
        <UserPosts currentPosts={currentPosts} />
        <Pagination pageNumbers={pageNumbers} paginate={paginate} />
      </div>
    );
  }
  
  export default MyPage;