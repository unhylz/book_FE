import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Container import는 여기 아래에 쭈르륵 해주세요
import HomeContainer from "./container/HomeContainer";
import Login from "./components/login/Login";
import SentimentLeagueContainer from "./container/SentimentLeagueContainer";
import TopNavSearchContainer from "./container/TopNavSearchContainer";
import Page1Container from "./container/Page1Container";
import LoginContainer from "./container/LoginContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route
            path="/sentiment-league"
            element={<SentimentLeagueContainer />}
          ></Route>
          <Route
            path="/top-nav-search"
            element={<TopNavSearchContainer />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
