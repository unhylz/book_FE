import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';



function App() {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Page1Container></Page1Container>}/>
        </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default component1;