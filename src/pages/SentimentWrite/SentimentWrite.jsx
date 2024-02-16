import React from "react";
import { useState, useRef, useEffect } from "react";
import "./SentimentWrite.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Modal from "react-modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BookLogo from "./BookLogo.png";
import ImgAdd from "./AddImg.png";
import axios from "axios";
import ModalFrame from "./Modal";

function DecoModal({ isOpen, onClose }) {
  const [issue, setIssue] = useState({
    title: "",
  });

  const hSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const customModalStyles = {
    content: {
      border: "none",
      maxWidth: "55%",
      maxHeight: "75%",
      margin: "auto",
      alignContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <Modal isOpen={isOpen} style={customModalStyles}>
        <form onSubmit={hSubmit}>
          <div className="modal-box">
            <p className="search-title">도서검색 API</p>
            <input
              style={{ borderRadius: "7px" }}
              className="search-input"
              placeholder="책 제목, 출판사, 저자를 검색해보세요."
            ></input>
          </div>
        </form>
        <button onClick={onClose}>Close</button>
      </Modal>
    </>
  );
}

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
  const [searchValid, setSearchValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [ratingValid, setRatingValid] = useState(true);
  const [inputTouched, setinputTouched] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  useEffect(() => {
    if (bookTitle) {
      setSearch(bookTitle);
    }
  }, [bookTitle]);

  //모달 state
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(!!e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchValid(!!e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(!!e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setinputTouched(true);

    if (title.trim() === "") {
      setTitleValid(false);
      return;
    }

    if (search.trim() === "") {
      setSearchValid(false);
      return;
    }

    if (content.trim() === "") {
      setContentValid(false);
      return;
    }

    if (rating === 0) {
      setRatingValid(false);
      return;
    }
  };

  const goToSentiment = () => {
    navigate("/sentiment/:id");
  };

  const handleCloseModal = () => {
    setTitleValid(true); // 모달이 닫힐 때 유효성 상태를 초기화
    setSearchValid(true);
    setContentValid(true);
    setRatingValid(true);
  };

  //모달 열고 닫는 핸들러
  const hModalOpen = () => {
    setIsOpen(true);
  };
  const hCloseModal = () => {
    setIsOpen(false);
  };

  //유효성 검사
  const inputValueIsValid =
    !titleValid &&
    !searchValid &&
    rating === 0 &&
    !contentValid &&
    inputTouched;

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
              <h1>타이틀을 입력해주세요</h1>
              <button className="close" onClick={handleCloseModal}>
                닫기
              </button>
            </ModalFrame>
          )}
          <div className="search-rating-box">
            <input
              className="search"
              placeholder="도서검색"
              value={search}
              onClick={hModalOpen}
            />
            <DecoModal isOpen={isOpen} onClose={hCloseModal} />
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
                  <h1>별점을 입력해주세요</h1>
                  <button className="close" onClick={handleCloseModal}>
                    닫기
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
                <h1>내용을 입력해주세요</h1>
                <button className="close" onClick={handleCloseModal}>
                  닫기
                </button>
              </ModalFrame>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
