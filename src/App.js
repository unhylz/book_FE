import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

//Container import는 여기 아래에 쭈르륵 해주세요
import LoginContainer from './container/LoginContainer';
import SentimentWrite from './pages/page2/SentimentWrite';
import SentimentDetail from './pages/page3/SentimentDetail';
import PasswordSearchContainer from './container/PasswordSearchContainer';
import SignupContainer from './container/SignupContainer';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginContainer/>}></Route>
        <Route path='/' element={<SentimentWrite></SentimentWrite>}/>
        <Route path='/detail' element={<SentimentDetail></SentimentDetail>}/>
        <Route path='/passwordsearch' element={<PasswordSearchContainer/>}></Route>
        <Route path='/signup' element={<SignupContainer/>}></Route>
        
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
