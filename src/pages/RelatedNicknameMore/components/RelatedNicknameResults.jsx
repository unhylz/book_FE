import React, { useState, useEffect, useContext } from "react";
//import { Link } from "react-router-dom";
import "./RelatedNicknameResults.scss";
import { NicknameFollow } from "../../../modules/api/search";
import { UserContext } from "../../../context/Login";

export default function RelatedNicknameResults({
  searchResult,
  displayedItems,
  userId,
}) {
  const user_context = useContext(UserContext);
  console.log("로그인 확인: ", user_context.user_data);

  //const userId = user_context.user_data.id; //"2"; //임시 --------------
  const isLogin = user_context.user_data.isLogin;

  const [InitialFollowStatus, setInitialFollowStatus] = useState([]);
  const [FollowStatus, setFollowStatus] = useState([]);

  useEffect(() => {
    //console.log("맨 처음 렌더링될 때 한 번만 실행");
    const sortedItems = displayedItems.sort((a, b) => a.user_id - b.user_id);
    console.log("가장 처음 팔로우 상태: ", sortedItems);

    setInitialFollowStatus(
      sortedItems.map((data) => {
        if (data.follow_status === "following") {
          return true;
        }
        if (data.follow_status === "follow") {
          return false;
        }
        if (data.follow_status === "myself") {
          return null;
        }
      })
    );
    setFollowStatus(
      sortedItems.map((data) => {
        if (data.follow_status === "following") {
          return true;
        }
        if (data.follow_status === "follow") {
          return false;
        }
        if (data.follow_status === "myself") {
          return null;
        }
      })
    );
  }, []);

  useEffect(() => {
    if (InitialFollowStatus) {
      console.log("팔로우 초기화: ", InitialFollowStatus);
    }
  }, [InitialFollowStatus]);

  const handleFollowClick = async (follower, index) => {
    if (!isLogin) {
      // 로그인 상태가 아닌 경우
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (!follower) {
      console.error("Invalid follower object");
      return;
    }

    try {
      if (userId === follower.user_id) {
        alert("자기 자신을 팔로우할 수 없습니다.");
        return;
      } else {
        const data = await NicknameFollow(userId, follower.user_id);
        const updatedFollowStatus = [...FollowStatus]; // FollowStatus 복사
        if (data.follow_status === "following") {
          updatedFollowStatus[index] = true;
        }
        if (data.follow_status === "follow") {
          updatedFollowStatus[index] = false;
        }
        setFollowStatus(updatedFollowStatus); // 업데이트된 팔로우 상태 저장
      }
    } catch (error) {
      console.error("팔로우 오류:", error);
    }
  };

  return (
    <div className="related-nickname-results">
      <div className="related-nickname-results-container">
        <div className="related-nickname-results-list">
          {displayedItems &&
            Array.isArray(displayedItems) &&
            displayedItems.length > 0 &&
            displayedItems
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
                      FollowStatus[index] === true
                        ? "followed"
                        : FollowStatus[index] === false
                        ? "not-followed"
                        : "null"
                    }`}
                  >
                    {FollowStatus[index] === true
                      ? "팔로잉"
                      : FollowStatus[index] === false
                      ? "팔로우"
                      : "내계정"}
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
