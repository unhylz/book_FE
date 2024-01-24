import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Container import는 여기 아래에 쭈르륵 해주세요
import LoginContainer from "./container/LoginContainer";
import PasswordSearchContainer from "./container/PasswordSearchContainer";
import SignupContainer from "./container/SignupContainer";
import SentimentWrite from "./pages/page2/SentimentWrite";
import SentimentDetail from "./pages/page3/SentimentDetail";
import MypageContainer from "./container/MypageContainer";
import HomeContainer from "./container/HomeContainer";
import SentimentLeagueContainer from "./container/SentimentLeagueContainer";
import TopNavSearchContainer from "./container/TopNavSearchContainer";
import SentimentDetailContainer from "./container/SentimentDetailContainer";
import BookDetailContainer from "./container/BookDetailContainer";
import RelatedBookMoreContainer from "./container/RelatedBookMoreContainer";
import RelatedSentimentMoreContainer from "./container/RelatedSentimentMoreContainer";
import RelatedNicknameMoreContainer from "./container/RelatedNicknameMoreContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route
            path="/sentiment-league"
            element={<SentimentLeagueContainer />}
          ></Route>
          <Route
            path="/top-nav-search"
            element={<TopNavSearchContainer />}
          ></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route
            path="/passwordsearch"
            element={<PasswordSearchContainer />}
          ></Route>
          <Route path="/signup" element={<SignupContainer />}></Route>

          <Route path="/write" element={<SentimentWrite></SentimentWrite>} />
          <Route path="/detail" element={<SentimentDetail></SentimentDetail>} />
          <Route path="/mypage" element={<MypageContainer></MypageContainer>} />

          <Route
            path="/sentiment/:id/:sentiment_title"
            element={<SentimentDetailContainer />}
          />
          <Route
            path="/book/:content/:book_title/:id"
            element={<BookDetailContainer />}
          ></Route>
          <Route
            path="/:content/related_book_more"
            element={<RelatedBookMoreContainer />}
          ></Route>
          <Route
            path="/:content/related_sentiment_more"
            element={<RelatedSentimentMoreContainer />}
          ></Route>
          <Route
            path="/:content/related_nickname_more"
            element={<RelatedNicknameMoreContainer />}
          ></Route>
          <Route path="/mypage" element={<MypageContainer></MypageContainer>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
