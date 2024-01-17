import React from 'react';



function UserStats({ userData }) {
  return (
    <div className="user-stats">
      <div className="stat">
        <div className="number">{userData.points}</div>
        <div className="label">센티멘트</div>
      </div>
      <div className="stat">
        <div className="number">{userData.likes}</div>
        <div className="label">추천수</div>
      </div>
      <div className="stat">
        <div className="number">{userData.comments}</div>
        <div className="label">스크랩</div>
      </div>
    </div>
  );
}

export default UserStats;