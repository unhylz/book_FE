import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Container import는 여기 아래에 쭈르륵 해주세요
import LoginContainer from "./container/LoginContainer";
import PasswordSearchContainer from "./container/PasswordSearchContainer";
import SignupContainer from "./container/SignupContainer";
import SentimentWrite from "./pages/SentimentWrite/SentimentWrite";
import SentimentDetail from "./pages/SentimentDetail/SentimentDetail";
import MypageContainer from "./container/MypageContainer";
import HomeContainer from "./container/HomeContainer";
import SentimentLeagueContainer from "./container/SentimentLeagueContainer";
import TopNavSearchContainer from "./container/TopNavSearchContainer";
import SentimentDetailContainer from "./container/SentimentDetailContainer";
import BookDetailContainer from "./container/BookDetailContainer";
import RelatedBookMoreContainer from "./container/RelatedBookMoreContainer";
import PasswordChangeContainer from "./container/PasswordChangeContainer";
import RelatedSentimentMoreContainer from "./container/RelatedSentimentMoreContainer";
import RelatedNicknameMoreContainer from "./container/RelatedNicknameMoreContainer";
import Mypage_followerContainer from "./container/MypageFollowerContainer";
import NotificationContainer from "./container/notificationContainer"
import Mypage_followingContainer from "./container/MypageFollowing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/sentiment-league" element={<SentimentLeagueContainer />} />
          <Route path="/top-nav-search" element={<TopNavSearchContainer />} />
          <Route
            path="/sentiment-league"
            element={<SentimentLeagueContainer />}
          ></Route>
          <Route path="/top-nav-search" element={<TopNavSearchContainer/>}/>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/passwordsearch" element={<PasswordSearchContainer />} />
          <Route path="/signup" element={<SignupContainer />}></Route>

          <Route path="/write" element={<SentimentWrite></SentimentWrite>} />
          <Route path="/detail" element={<SentimentDetail></SentimentDetail>} />
          <Route path="/passwordsearch" element={<PasswordSearchContainer />}/>
          <Route path="/passwordchange" element={<PasswordChangeContainer/>}/>
          <Route path="/signup" element={<SignupContainer />}></Route>
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
          <Route path="/mypage_follower"
           element={<Mypage_followerContainer></Mypage_followerContainer>} />
          <Route path="/mypage_following"
           element={<Mypage_followingContainer></Mypage_followingContainer>} />
           <Route path="/notification" 
           element={<NotificationContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
