import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function UserStats({ userData }) {
  const navigate = useNavigate();

  const goToMypageFollower = () => {
    navigate('../mypage_follower');
  };

  const goToMypageScrap = () => {
    navigate('../mypageScrap');
  };

  return (
    <div className="user-stats">
      <div className="stat">
        <div className="number">{userData.points}</div>
        <div className="label">센티멘트</div>
      </div>
      <div className="like-stat" onClick={goToMypageFollower}>
        <div className="number">{userData.likes}</div>
        <div className="label">추천수</div>
      </div>
      <div className="stat" onClick={goToMypageScrap}>
          <div className="number">{userData.comments}</div>
          <div className="label">스크랩</div>
      </div>
    </div>
  );
}

export default UserStats;
