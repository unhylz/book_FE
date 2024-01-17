import React from 'react'
import './page1.scss'
import { Link } from 'react-router-dom'
import logoimg from './components/img/logo.png'
import MyPage from './components/mypage/mypage'


export default function Page1() {
  return (
    <div className='a'>
    <div className='Header-container'>
      <div className='header-wrap'>
        <div className='header-left-wrap'>
          <Link to='/'>
            <img
            style={{width: "175px", height: "84px"}} 
            src={logoimg}
            alt="logo"
            />
          </Link>
          <form action="/search" method="get">
          <input className="search-form" type="text" id="search-input" name="검색값" placeholder="책 제목, 센티먼트, 유저를 검색하세요."/>
          <button type="submit">검색</button>
          </form>
          <ul>
            <li>
              <Link className='header-nav-item'>Leage</Link>
            </li>
            <li>
              <Link className='header-nav-item'>Write</Link>
            </li>
            <li>
              <Link className='header-nav-item'>Notification</Link>
            </li>
            <li>
              <Link className='header-nav-item'>User_name</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MyPage/>
    </div>
  )
}
