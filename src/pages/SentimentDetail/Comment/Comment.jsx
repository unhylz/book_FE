import "./Comment.scss";
import React, { useEffect, useState } from "react";

import CommentDummy from "./CommentDummy";
import userImg from "../../../assets/icons/user_Img.png";
import RookieIcon from "../../../assets/tiers/루키.svg";
import SilverIcon from "../../../assets/tiers/실버.svg";
import GoldIcon from "../../../assets/tiers/골드.svg";
import DiaIcon from "../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../assets/tiers/그랜드마스터.svg";
import Notification from "../../page1/notification/notification";
import recommentIcon from "../../../assets/icons/comment.svg";
import likeIcon from "../../../assets/icons/like.svg";
import { SentimentIdSearch } from "../../../modules/api/search";

export default function CommentItem(data, id) {
  const [SearchData, setSearchData] = useState(null);

  useEffect(() => {
    console.log("센티먼트 데이터 확인용 55:", data);

    if (data) {
      setSearchData(data.data[1].comment);
    }
  }, [data]);

  useEffect(() => {
    console.log("센티먼트 데이터 확인용 66:", SearchData);
  }, [SearchData]);

  const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };

    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");

    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;

    return SelectedIcon;
  };

  return (
    <div className="comment-list-item">
      {SearchData &&
        SearchData.map((result) => (
          <div key={result.comment_id} className="comment-result">
            <div className="comment-header">
              <div className="list-top">
                <div className="profile-box">
                  <img
                    src={result.profile_image}
                    alt="profile_image"
                    className="profile-image"
                    style={{ width: "36px", height: "36px" }}
                  />
                </div>
                <div className="info-box">
                  <div className="name-tier">
                    <div className="nickname">{result.nickname}</div>
                    <img
                      src={getTierIcon(result.tier)}
                      alt="result.tier"
                      className="tier-icon"
                    />
                  </div>
                  <div className="time">{result.created_at}</div>
                </div>
              </div>
              <div className="like-recomment-container">
                <div className="like">
                  <img
                    src={likeIcon}
                    alt="like"
                    className="comment-like-icon"
                  />
                </div>
                <div className="divider"></div>
                <div className="recomment">
                  <img
                    src={recommentIcon}
                    alt="recomment"
                    className="recomment-icon"
                  />
                </div>
              </div>
            </div>
            <div className="comment-main">
              <div className="content">{result.content}</div>
              <div className="comment-like-count"></div>
            </div>
          </div>
        ))}
      <div className="input-container">
        <div className="text-box">
          <textarea
            className="textarea"
            placeholder="댓글을 작성하세요"
          ></textarea>
          <div className="text-count">0/300</div>
        </div>
        <button className="comment-button">{"작성하기"}</button>
      </div>
    </div>
  );
}
