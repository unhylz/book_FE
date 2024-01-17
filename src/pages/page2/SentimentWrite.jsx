import React from 'react';
import { useState } from 'react';
import "./SentimentWrite.scss";
import { Link } from 'react-router-dom';
import BookLogo from "./BookLogo.png";
import { PiStarFill, PiStarLight } from "react-icons/pi";



function Header() {
    return (
        <header className="header-container">
            <Link to="/" className="logo">
                <img
                    style={{ width: "175px", height: "84px" }}
                    src={BookLogo} alt="logo" />
            </Link>
            <button className='write-btn'>
                <p>작성하기</p>
            </button>
        </header>
    );
}


export default function SentimentWrite() {

    const [Title, setTitle] = useState('');
    const [Search, setSearch] = useState('');
    const [Content, setContent] = useState('');
    const [rating, setRating] = useState(3);


    return (
        <div className="write">
            <Header/>
            <input className="title" placeholder="글 제목" value={Title}/>
            <input className="search" placeholder="도서검색" value={Search}/>
            <div className='RatingContainer'>
                <div className='star'>
                    {[...Array(rating)].map((a, i) => (
                        <PiStarFill className="star-lg" key={i} onClick={() => setRating(i + 1)} />
                    ))}
                    {[...Array(5 - rating)].map((a, i) => (
                        <PiStarLight className="star-lg" key={i} onClick={() => setRating(rating + i + 1)} />
                    ))}
                </div>
                <p className="PIndex">
                    {rating === 5
                    ? '5.0'
                    : rating === 4
                    ? '4.0'
                    : rating === 3
                    ? '3.0'
                    : rating === 2
                    ? '2.0'
                    : '1.0'}
                </p>
            </div>
            <div >
                <input className="input_box" placeholder="Tell your sentiment" value={Content} />
            </div>
        </div>
    )
}
