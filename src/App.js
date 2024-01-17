import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

//Container import는 여기 아래에 쭈르륵 해주세요
//import Page1Container from './container/Page1Container';
import SentimentWrite from './pages/page2/SentimentWrite';
import SentimentDetail from './pages/page3/SentimentDetail';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SentimentWrite></SentimentWrite>}/>
        <Route path='/detail' element={<SentimentDetail></SentimentDetail>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
