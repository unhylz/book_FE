import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

//Container import는 여기 아래에 쭈르륵 해주세요
import Page1Container from './container/Page1Container';
import LoginContainer from './container/LoginContainer';
import PasswordSearchContainer from './container/PasswordSearchContainer';
import SignupContainer from './container/SignupContainer';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page1Container></Page1Container>}/>
        <Route path='/login' element={<LoginContainer/>}></Route>
        <Route path='/passwordsearch' element={<PasswordSearchContainer/>}></Route>
        <Route path='/signup' element={<SignupContainer/>}></Route>
        
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
