import React from "react";
import { useState, useRef, useEffect } from "react";
import "./SentimentWrite.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BookLogo from "./BookLogo.png";
import ImgAdd from "./AddImg.png";
import axios from "axios";
import ModalFrame from "./Modal";

export default function SentimentWrite() {
  const location = useLocation();
  const bookTitle = location.state.bookTitle;
  console.log("bookTitle: ", bookTitle);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [ratingValid, setRatingValid] = useState(true);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  useEffect(() => {
    if (bookTitle) {
      setSearch(bookTitle);
    }
  }, [bookTitle]);

  //제목, 내용, 평점 유효성 검사 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(!!e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(!!e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setTitleValid(false);
      return;
    }

    if (rating === 0) {
      setRatingValid(false);
      return;
    }

    if (content.trim() === "") {
      setContentValid(false);
      return;
    }
  };

  const goToSentiment = () => {
    navigate("/sentiment/:id");
  };

  const handleCloseModal = () => {
    setTitleValid(true); // 모달이 닫힐 때 유효성 상태를 초기화
    // setSearchValid(true);
    setContentValid(true);
    setRatingValid(true);
  };

  //이미지 미리보기
  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  //글 등록
  const [sentiment, setSentiment] = useState({
    title: "",
  });

  const saveSentiment = async () => {
    await axios.post(`/sentiments/{user-id}/write`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <header className="header-container">
        <Link to="/" className="logo">
          <img
            style={{ width: "175px", height: "84px" }}
            src={BookLogo}
            alt="logo"
          />
        </Link>
        <div className="btn-user-container">
          <button className="write-btn" onSubmit={handleFormSubmit}>
            작성하기
          </button>
          {/* 사용자 정보 들어가야함 */}
          <div className="user-box">Paul</div>
        </div>
      </header>

      <div className="write">
        <div className="image-add-container">
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
            ref={imgRef}
          />
          <img
            style={{ width: "60px", height: "60px" }}
            src={ImgAdd}
            alt="addbtn"
            onClick={() => document.getElementById("imageInput").click()}
          />
        </div>
        <div className="write-container">
          <input
            className="title"
            placeholder="글 제목"
            value={title}
            onChange={handleTitleChange}
          />
          {!titleValid && (
            <ModalFrame _handleModal={handleCloseModal}>
              <h3>www.booksentimentleague.com 내용:</h3>
              <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                글 제목을 작성해주세요.(글자제한)
              </div>
              <button
                className="close"
                onClick={handleCloseModal}
                style={{
                  width: "90px",
                  backgroundColor: "#5FCB75",
                  color: "white",
                  fontSize: "20px",
                  borderRadius: "30px",
                  padding: "10px",
                  border: "none",
                  marginLeft: "72%",
                  cursor: "pointer",
                }}
              >
                확인
              </button>
            </ModalFrame>
          )}
          <div className="search-rating-box">
            <input
              className="search"
              value={search}
              readOnly
            />
            <div className="rating-box">
              <div className="star">
                {[...Array(rating)].map((a, i) => (
                  <PiStarFill
                    className="star-lg"
                    key={i}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
                {[...Array(5 - rating)].map((a, i) => (
                  <PiStarLight
                    className="star-lg"
                    key={i}
                    onClick={() => setRating(rating + i + 1)}
                  />
                ))}
              </div>
              <p className="rating-index">
                {rating === 5
                  ? "5.0"
                  : rating === 4
                  ? "4.0"
                  : rating === 3
                  ? "3.0"
                  : rating === 2
                  ? "2.0"
                  : rating === 1
                  ? "1.0"
                  : "0.0"}
              </p>
              {!ratingValid && (
                <ModalFrame _handleModal={handleCloseModal}>
                  <h3>www.booksentimentleague.com 내용:</h3>
                  <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                    평점을 부여해주세요.(최소 1점부터 최대 5점까지)
                  </div>
                  <button
                    className="close"
                    onClick={handleCloseModal}
                    style={{
                      width: "90px",
                      backgroundColor: "#5FCB75",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "30px",
                      padding: "10px",
                      border: "none",
                      marginLeft: "72%",
                      cursor: "pointer",
                    }}
                  >
                    확인
                  </button>
                </ModalFrame>
              )}
            </div>
          </div>
          <div>
            {imgFile && (
              <img
                src={imgFile}
                alt="삽입 사진"
                style={{ width: "1000px", height: "1000px" }}
              />
            )}
            <input
              className="input_box"
              placeholder="Tell your sentiment"
              value={content}
              onChange={handleContentChange}
            />
            {!contentValid && (
              <ModalFrame _handleModal={handleCloseModal}>
                <h3>www.booksentimentleague.com 내용:</h3>
                <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                  센티멘트를 20자 이상 작성해주세요.
                </div>
                <button
                  className="close"
                  onClick={handleCloseModal}
                  style={{
                    width: "90px", backgroundColor: "#5FCB75", color: "white", fontSize: "20px",
                    borderRadius: "30px", padding: "10px", border: "none", marginLeft: "72%",cursor: "pointer",
                  }}
                >
                  확인
                </button>
              </ModalFrame>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
