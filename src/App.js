import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Container import는 여기 아래에 쭈르륵 해주세요
import HomeContainer from "./container/HomeContainer";
import SentimentLeagueContainer from "./container/SentimentLeagueContainer";
import TopNavSearchContainer from "./container/TopNavSearchContainer";
import LoginContainer from "./container/LoginContainer";
import SentimentWrite from './pages/page2/SentimentWrite';
import SentimentDetail from './pages/page3/SentimentDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/sentiment-league" element={<SentimentLeagueContainer />}></Route>
          <Route path="/top-nav-search" element={<TopNavSearchContainer />}></Route>
          <Route path='/login' element={<LoginContainer/>}></Route>
          <Route path='/write' element={<SentimentWrite></SentimentWrite>}/>
          <Route path='/detail' element={<SentimentDetail></SentimentDetail>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
