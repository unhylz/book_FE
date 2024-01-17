import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';


//Container import는 여기 아래에 쭈르륵 해주세요
import MypageContainer from './container/MypageContainer';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MypageContainer></MypageContainer>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
