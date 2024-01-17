import React from 'react';
import { useNavigate } from 'react-router-dom';
import postdata from '../../../../../modules/api/dummy_posts';


function UserPosts({ currentPosts }) {
  const navigate = useNavigate();

  const OnclickSentiment = () => {
    navigate(`/mypage/${currentPosts.title}`,
    {
      state: currentPosts
    })
  }

  return (
    <div className="user-posts">
      <h1>센티먼트</h1>
      {currentPosts.map((post, index) => (
        <div key={index} className="post" onClick={OnclickSentiment}>
          <div className="title">{post.title}</div>
          <div className="rating">★ {post.rating}</div>
          <div className="date">{post.date} {post.time}</div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;