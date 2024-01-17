import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Container import는 여기 아래에 쭈르륵 해주세요
<<<<<<< Updated upstream
import Page1Container from './container/Page1Container';

=======
import HomeContainer from "./container/HomeContainer";
import Login from "./components/login/Login";
import SentimentLeagueContainer from "./container/SentimentLeagueContainer";
import TopNavSearchContainer from "./container/TopNavSearchContainer";
>>>>>>> Stashed changes
function App() {
  return (
    <>
      <BrowserRouter>
<<<<<<< Updated upstream
      <Routes>
        <Route path='/' element={<Page1Container></Page1Container>}/>
      </Routes>
=======
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/sentiment-league"
            element={<SentimentLeagueContainer />}
          ></Route>
          <Route
            path="/top-nav-search"
            element={<TopNavSearchContainer />}
          ></Route>
        </Routes>
>>>>>>> Stashed changes
      </BrowserRouter>
    </>
  );
}

export default App;
