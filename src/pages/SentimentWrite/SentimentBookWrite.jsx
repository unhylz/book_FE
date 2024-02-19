import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import "./SentimentWrite.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BookLogo from "./BookLogo.png";
import ImgAdd from "./AddImg.png";
import axios from "axios";
import ModalFrame from "./Modal";
import { UserContext } from "../../context/Login";
import { MyPageProfile } from "../../modules/api/search";
import userImg from "../../assets/icons/user_Img.png"

export default function SentimentBookWrite() {
  const location = useLocation();
  const bookTitle = location.state.bookTitle;
  const author = location.state.author;
  const bookImageFile = location.state.bookImageFile;
  const publisher = location.state.publisher;

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
  const [selectedBook, setSelectedBook] = useState("");
  const [profile, setProfile] = useState(null);
  const imgRef = useRef();

  const user_context = useContext(UserContext);
  console.log(user_context);
  console.log(user_context.user_data.id);
  const user_id = user_context.user_data.id; // 사용자 ID
  const isLoggedIn = user_context.user_data.isLogin;

  useEffect(() => {
    if (bookTitle) {
      setSearch(bookTitle);
      setSelectedBook(bookTitle);
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

  const handleFormSubmit = async (e) => {
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

    try {
      // 모든 유효성 검사를 통과한 경우에만 API에 데이터를 전송
      const formData = new FormData();
      formData.append("sentiment_title", title);
      formData.append("book_title", selectedBook);
      formData.append("content", content);
      formData.append("score", rating);
      formData.append("user_id", user_id);
      if (imgFile) {
        formData.append("image_path", imgFile);
      }
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("book_image", bookImageFile);
  
      // API 요청
      const response = await axios.post(`/sentiments/${user_id}/write`, formData);
      console.log('응답 데이터:', response.data);
      alert("api 전송 성공");
  
    } catch (error) {
      console.error('글 등록 오류:', error);
    }
    goToSentiment();
  };

  const goToSentiment = () => {
    navigate("/");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await MyPageProfile(user_id);
        setProfile(profile[0]);
      } catch (error) {
        console.error("데이터 가져오기 오류 - 프로필:", error);
      }
    };

    if (user_context.user_data.isLogin) {
      fetchData();
    }
    if (profile) {
      console.log("===== profile 데이터:", profile);
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      {profile && (
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
          {(profile.profile_image === null || profile.profile_image === "기본 프로필") && (
            <img
              src={userImg}
              alt="MyPage"
              className="user-image"
            />
          )}
          {!(profile.profile_image === null || profile.profile_image === "기본 프로필") && (
            <img
              src={profile.profile_image}
              alt="MyPage"
              className="user-image"
            />
          )}
          <div className="user-box">{profile.nickname}</div>
        </div>
      </header>
      )}

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
                    color="#5FCB75"
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
