import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../../../pages/Home/components/header/Header";
import { sentimentDummy } from "../../../../Home/components/sentiment/sentimentDummy";
import SideAd from "../../../../Home/components/advertisement/SideAd";
import Footer from "../../../../../pages/Home/components/footer/Footer";
import "../../../../Home/components/sentiment/Sentiment.scss";
import boockmarkIcon from "../../../../../assets/icons/bookmark.svg";
import commentIcon from "../../../../../assets/icons/comment.svg";
import likeIcon from "../../../../../assets/icons/like.svg";
import RookieIcon from "../../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../../assets/tiers/그랜드마스터.svg";
import "../mypage.scss";
import Pagination from "./pagenation";
import axios from "axios";
import "../mypageScrap.scss"

/*function fetchTotalItems() {
  // 서버의 특정 엔드포인트에서 전체 아이템 수를 가져옴
  return fetch('http://3.37.54.220:3000/sentiments/{sentiment-id}')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.totalCount) // 'totalCount'는 서버 응답에서 전체 아이템 수를 나타내는 필드
    .catch(error => {
      console.error('Fetching total items count failed:', error);
    });
}*/

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const year = String(dateTime.getFullYear()).slice(-2);
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
} 

export default function MypageScrap() {
    const [selectedButton, setSelectedButton] = useState("sentiment");
    const [result, setResult] = useState(sentimentDummy);
    const [modalState, setModalState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const postsPerPage = 5; // 페이지당 5개의 포스트
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
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
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    useEffect(() => {
      axios.get('http://3.37.54.220:3000/users/abc1234@naver.com/scrap')
      .then((Response) => {
        setResult(Response.data);
        setTotalItems(Response.data.length)
      .then((data) => console.log(data)); 
      })
      .catch((error) => {
        console.log('Error fetching data: ', error);
      });
    }, []);
    

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      // 페이지 변경에 따른 추가 로직
    };

    return (
        <div>
            <Header onLogoClick={handleButtonClick} setModalState={setModalState} />
            <div className="mypage-wrapper">
                <div className="left">
                    <SideAd />
                </div>
                <div className="main-container">
                <strong className="Title">스크랩</strong>
                <div className="mypage-container">
                    <div className="search-container">
                        {currentPosts.map((result) => (
                            <div key={result.id} className="search-result">
                    <div className="info">
                    <Link
                      to={`/sentiment/${result.id}/${result.sentiment_title}`}
                      className="book-link"
                    >
                      <img
                        src={`/bookcover_dummy/${result.image_file}`}
                        alt={result.title}
                      />
                    </Link>
                    <div className="none-img">
                      <div className="detail-info">
                        <Link
                          to={`/sentiment/${result.id}/${result.sentiment_title}`}
                          className="book-link"
                        >
                          <h3>{result.sentiment_title}</h3>
                        </Link>
                        <p>
                          <strong>{result.book_title}</strong> ({result.author}/
                          {result.publisher})
                        </p>
                      </div>
                      <div className="additional-info">
                        <div className="nickname">
                          <p>닉네임: {result.nickname} </p>
                        </div>
                        <div className="tier">
                          <p>티어: </p>
                          <img
                            src={getTierIcon(result.tier)}
                            alt="result.tier"
                            className="tier-icon"
                          />
                        </div>
                        <div className="likes">
                          <img src={likeIcon} alt="like" className="like-icon" />
                          <p>{result.likes}</p>
                        </div>
                        <div className="comments">
                          <img
                            src={commentIcon}
                            alt="comment"
                            className="comment-icon"
                          />
                          <p>{result.comments}</p>
                        </div>
                        <div className="bookmarks">
                          <img
                            src={boockmarkIcon}
                            alt="bookmark"
                            className="bookmark-icon"
                          />
                          <p>{result.bookmarks}</p>
                        </div>
                        <p className="datetime">{formatDateTime(result.datetime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              ))}
            </div>
            </div>
            <div className="pagination-container">
        <div className="pagination">
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
          </div>
          <div className="right">
          <SideAd />
          </div>
          <div>
    </div>
          </div>
          <Footer />
        </div>
    );
}