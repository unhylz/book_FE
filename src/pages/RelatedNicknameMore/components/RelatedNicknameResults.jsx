import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import "./RelatedNicknameResults.scss";
import { NicknameFollow } from "../../../modules/api/search";

export default function RelatedNicknameResults({
  searchResult,
  displayedItems,
}) {
  const userId = "2"; // 실제 사용자 ID로 대체 필요 ---------------
  const [FollowStatus, setFollowStatus] = useState([]);

  useEffect(() => {
    const fetchInitialFollowStatus = async () => {
      try {
        // displayedItems에서 user_id의 오름차순으로 데이터 정렬
        const sortedItems = displayedItems.nicknameObject.sort(
          (a, b) => a.user_id - b.user_id
        );

        const initialFollowStatus = await Promise.all(
          sortedItems.map(async (follower) => {
            const data = await NicknameFollow(userId, follower.user_id);
            return data.follow_status === "following";
          })
        );
        setFollowStatus(initialFollowStatus);
      } catch (error) {
        console.error("팔로우 상태 초기화 오류:", error);
      }
    };

    fetchInitialFollowStatus();
  }, []);

  const handleFollowClick = async (follower, index) => {
    if (!follower) {
      console.error("Invalid follower object");
      return;
    }

    try {
      const data = await NicknameFollow(userId, follower.user_id);
      const updatedFollowStatus = [...FollowStatus];
      updatedFollowStatus[index] = data.follow_status === "following";
      setFollowStatus(updatedFollowStatus);
    } catch (error) {
      console.error("팔로우 오류:", error);
    }
  };

  return (
    <div className="related-nickname-results">
      <div className="related-nickname-results-container">
        <div className="related-nickname-results-list">
          {displayedItems.nicknameObject &&
            Array.isArray(displayedItems.nicknameObject) &&
            displayedItems.nicknameObject.length > 0 &&
            displayedItems.nicknameObject
              .sort((a, b) => a.user_id - b.user_id)
              .map((follower, index) => (
                <div key={index} className="related-follower-card">
                  <img
                    src={follower.profile_image}
                    alt={follower.nickname}
                    className="related-follower-image"
                  />
                  <div className="related-follower-info">
                    <h3 className="related-follower-name">
                      {follower.nickname}
                    </h3>
                    <p className="follower-bio">{follower.status_message}</p>
                  </div>
                  <button
                    onClick={() => handleFollowClick(follower, index)}
                    className={`follower-status ${
                      FollowStatus[index] ? "followed" : "not-followed"
                    }`}
                  >
                    {FollowStatus[index] ? "팔로잉" : "팔로우"}
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
