import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moreIcon from "../../../../assets/icons/moreicon.svg";
import "./RelatedNickname.scss";
import { NicknameFollow } from "../../../../modules/api/search";

export default function RelatedNickname({ searchResult, displayedItems }) {
  const userId = "2"; // 실제 사용자 ID로 대체 필요 ---------------
  const [FollowStatus, setFollowStatus] = useState([]);

  useEffect(() => {
    const fetchInitialFollowStatus = async () => {
      try {
        // displayedItems에서 user_id의 오름차순으로 데이터 정렬
        const sortedItems = displayedItems.nicknameObject.sort(
          (a, b) => a.user_id - b.user_id
        );

        // 정렬된 데이터를 기반으로 초기 팔로우 상태 설정
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
      const updatedFollowStatus = [...FollowStatus]; // FollowStatus 복사
      if (data.follow_status === "following") {
        updatedFollowStatus[index] = true;
      }
      if (data.follow_status === "follow") {
        updatedFollowStatus[index] = false;
      }
      setFollowStatus(updatedFollowStatus); // 업데이트된 팔로우 상태 저장
    } catch (error) {
      console.error("팔로우 오류:", error);
    }
  };

  return (
    <>
      <div className="related-nickname-container">
        <div className="related-nickname-list">
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
                    onClick={() => handleFollowClick(follower, index)} // 인덱스도 함께 전달
                    className={`follower-status ${
                      FollowStatus[index] ? "followed" : "not-followed" // 팔로우 상태에 따라 클래스 지정
                    }`}
                  >
                    {FollowStatus[index] ? "팔로잉" : "팔로우"}
                    {/* 팔로우 상태에 따라 버튼 텍스트 변경 */}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <div className="more-details">
        <Link
          to={`/${searchResult.content}/related_nickname_more`}
          className="more-link"
        >
          <h3>더보기</h3>
          <img src={moreIcon} alt="moreIcon" className="more-icon" />
        </Link>
      </div>
    </>
  );
}
