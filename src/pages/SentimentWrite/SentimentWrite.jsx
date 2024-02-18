import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./SentimentWrite.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import BookLogo from "./BookLogo.png";
import ImgAdd from "./AddImg.png";
import ModalFrame from "./Modal";
import { UserContext } from "../../context/Login";
import { SentimentBookSearch } from "./api";
import searchIcon from "./search.png"
import axios from "axios";
import "./BookSearch.scss";

function DecoModal({ isOpen, onClose, search }) {
  const [issue, setIssue] = useState({
    title: "",
  });

  const [content, setContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [bookData, setBookData] = useState("");

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };
  const handleSearch = () => {
    setSearchContent(content);
    console.log(searchContent)
  };

  const hSubmit = (e) => {
    e.preventDefault();
    //onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SentimentBookSearch(searchContent);
        setBookData(data.list);
        console.log(bookData)
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };
    if (searchContent) {
      fetchData();
    }
  }, [searchContent]);

  useEffect(() => {
    if (bookData && bookData[0].title) {
      console.log("검색 도서 데이터:", bookData[0].title);
    }
  }, [bookData]);

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
  function formatPublishYear(dateTimeString) {
    //const dateTime = new Date(dateTimeString);
    //const year = String(dateTime.getFullYear()).slice(-4);
    const year = dateTimeString.slice(0, 4);

    return `${year}`;
  }
  function hButtonClick(search){
    console.log(search);
    search = search;
    onClose();
    // search = e.target.value;
    // console.log("ㅎㅇ", e.target.value)
  }

  return (
    <>
      <Modal isOpen={isOpen} style={customModalStyles} search={search}>
        <form onSubmit={hSubmit}>
          <div className="modal-box">
            <p className="search-title" style={{ fontWeight: "bold" }}>
              도서검색 API
            </p>
            <div style={{borderRadius:'7px'}} className="search-input-box">
              <input
                value={content}
                className="search-input"
                placeholder="책 제목, 출판사, 저자를 검색해보세요."
                onChange={handleInputChange}
              ></input>
              <img className="search-icon" src={searchIcon} alt="검색 아이콘" style={{width:"28px", height:"28px"}} onClick={handleSearch}></img>
            </div>
          </div>
        </form>
        <div>
          {bookData && bookData[0].title && (
            <div className="book-results">
              <div className="sort">정확도순</div>
              {bookData.map((result, index) => (
                <div key={index} className="search-result">
                  <div className="book-info">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="book-image"
                    />
                    <div className="none-img-detail-info">
                      <h2>{result.title}</h2>
                      <div className="publish-info">
                        <p style={{fontSize:"16px"}}>
                          {result.author}{"(저자)"} | {result.publisher} |{" "}
                          {formatPublishYear(result.pubdate)}년
                        </p>
                      </div>
                      <div className="vote-info">
                        <p className="vote-avg">유저평점: &nbsp;</p>
                        <p className="vote-avg">{result.avr_score}</p>
                        <p className="vote-num">&nbsp; ({result.eval_num}명 평가)</p>
                      </div>
                    </div>
                    <button className="select-book" onClick={hButtonClick}>선택</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default function SentimentWrite() {
  const location = useLocation();
  const bookTitle = location.state ? location.state.bookTitle : null;
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

  //유저 콘텍스트-----------------------------------------------------------

  const user_context = useContext(UserContext);
  console.log(user_context);
  console.log(user_context.user_data.id);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setinputTouched(true);

    if (title.trim() === "") {
      setTitleValid(false);
      return;
    }

    // if(search.trim() === ""){
    // 	setSearchValid(false);
    // 	return;
    // }
    if (rating === 0) {
      setRatingValid(false);
      return;
    }

    if (content.trim() === "" || content.length < 20) {
      setContentValid(false);
      return;
    }

    try {
      // 모든 유효성 검사를 통과한 경우에만 API에 데이터를 전송
      const user_id = user_context.user_data.id; // 사용자 ID
      const data = {
        title: title,
        search: search,
        content: content,
        rating: rating,
        userId: user_id
      };
  
      // API 요청
      const response = await axios.post(`/sentiments/${user_id}/write`, data);
      console.log('응답 데이터:', response.data);
  
      // API 요청이 성공했을 때 추가 작업 수행
      // 예를 들어, 사용자에게 성공 메시지를 보여주거나 페이지를 리디렉션할 수 있습니다.
      alert("api 전송 성공")
  
    } catch (error) {
      console.error('글 등록 오류:', error);
      // API 요청이 실패한 경우 에러 처리
      // 예를 들어, 사용자에게 에러 메시지를 보여줄 수 있습니다.
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
  // const inputValueIsValid =
  //   !titleValid &&
  //   !searchValid &&
  //   rating === 0 &&
  //   !contentValid &&
  //   inputTouched;

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

//========================= API 연동 ================================

  // const saveSentiment = async () => {
  //   try {
  //     const user_id = user_context.user_data.id; // 사용자 ID
  //     const data = {
  //       title: title,
  //       search: search,
  //       content: content,
  //       rating: rating,
  //       userId: user_id // 사용자 ID를 요청에 포함시킴
  //     };

  //     // POST 요청을 보내고 응답을 기다림
  //     const response = await axios.post('/sentiments/write', data);

  //     // 응답 확인 및 처리
  //     console.log('응답 데이터:', response.data);

  //     // 여기서 필요한 추가 작업 수행
  //   } catch (error) {
  //     console.error('글 등록 오류:', error);
  //   }
  // };
  // const handleWriteButtonClick = async (e) => {
  //   e.preventDefault();
  //   await saveSentiment();
  //   // API 요청이 완료된 후에 수행해야 할 작업이 있다면 여기에 추가할 수 있습니다.
  // };

  const modalstyle ={
    width: "90px",
    backgroundColor: "#5FCB75",
    color: "white",
    fontSize: "20px",
    borderRadius: "30px",
    padding: "10px",
    border: "none",
    marginLeft: "72%",
    cursor: "pointer",
  }

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
          <button type="submit" className="write-btn" >
            작성하기
          </button>
          {/* 사용자 정보 들어가야 함 */}
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
                style={ modalstyle }
              >
                확인
              </button>
            </ModalFrame>
          )}
          <div className="search-rating-box">
            <input
              className="search"
              placeholder="도서검색"
              value={search}
              onClick={hModalOpen}
              onChange={handleSearchChange}
            />
            <DecoModal isOpen={isOpen} onClose={hCloseModal} search={search}/>
            {!searchValid && (
              <ModalFrame _handleModal={handleCloseModal}>
                <h3>www.booksentimentleague.com 내용:</h3>
                <div style={{ fontWeight: "bold", marginBottom: "55px" }}>
                  도서를 선택해주세요.
                </div>
                <button
                  className="close"
                  onClick={handleCloseModal}
                  style={ modalstyle }
                >
                  확인
                </button>
              </ModalFrame>
            )}
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
                    style={ modalstyle }
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
                  style={modalstyle}
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
