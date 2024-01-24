import React from 'react';
import { useState } from 'react';
import "./SentimentWrite.scss";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import BookLogo from "./BookLogo.png";
import ImgAdd from "./AddImg.png";


function Header() {
    return (
        <header className="header-container">
            <Link to="/" className="logo">
                <img
                    style={{ width: "175px", height: "84px" }}
                    src={BookLogo} alt="logo" />
            </Link>
            <div className='btn-user-container'>
                <button className='write-btn'>
                    작성하기
                </button>
                <div className='user-box'>
                    사용자
                </div>
            </div>
        </header>
    );
}


function DecoModal({isOpen, onClose}) {
    const [issue, setIssue] = useState(
        {
            title:""
        }
    )
    
    const hSubmit=(e)=>{
        e.preventDefault();
        onClose()
    }

    const customModalStyles = {
        content: {
          border: 'none',
          maxWidth: '55%',
          maxHeight: '75%',
          margin: 'auto',
          alignContent: 'center',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return (
        <>
        <Modal isOpen={isOpen} style={customModalStyles}>
            <form onSubmit={hSubmit}>
                <div className='modal-box'>
                    <p className='search-title'>도서검색 API</p>
                    <input style={{borderRadius:'7px'}} className='search-input' placeholder='책 제목, 출판사, 저자를 검색해보세요.'></input>
                </div>

            </form>
            <button onClick={onClose}>Close</button>
        </Modal>
        </>
    )
}


export default function SentimentWrite( {handleImageChange} ) {

	const [Title, setTitle] = useState('');
	const [Search, setSearch] = useState('');
	const [Content, setContent] = useState('');
	const [rating, setRating] = useState(5);
	const [isOpen, setIsOpen] = useState(false);

	const handleTitleChange = (e) => {
			setTitle(e.target.value);
	};

	const handleSearchChange = (e) => {
			setSearch(e.target.value);
	};

	const handleContentChange = (e) => {
			setContent(e.target.value);
	};


	
	const hModalOpen=() => {
			setIsOpen(true)
	}

	const hCloseModal=() => {
			setIsOpen(false)
	}


	return (
		<div>
			<Header/>
			<div className='write'>
				<div className='image-add-container'>
					<input 
            type="file" 
            id="imageInput" 
            hidden="hidden" 
            onChange={handleImageChange} />
					<img
						style={{ width: "60px", height: "60px" }}
						src={ImgAdd} alt="addbtn" 
						onClick={() => document.getElementById('imageInput').click()} />
				</div>
				<div className='write-container'>
					<input className="title" placeholder="글 제목" value={Title} onChange={handleTitleChange}/>
					<div className='search-rating-box'>
						<input className="search" placeholder="도서검색" value={Search} onClick={hModalOpen} />
						<DecoModal isOpen={isOpen} onClose={hCloseModal} />
						<Modal modalIsOpen={true}>
								This is Modal content
								<button onClick={()=> setIsOpen(false)}>Modal Open</button>
						</Modal>
						<div className='rating-box'>
							<div className='star'>
								{[...Array(rating)].map((a, i) => (
										<PiStarFill className="star-lg" key={i} onClick={() => setRating(i + 1)} />
								))}
								{[...Array(5 - rating)].map((a, i) => (
										<PiStarLight className="star-lg" key={i} onClick={() => setRating(rating + i + 1)} />
								))}
							</div>
							<p className="rating-index">
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
					</div>
					<div >
						<input className="input_box" placeholder="Tell your sentiment" value={Content} onChange={handleContentChange} />
					</div>
				</div>
			</div>
		</div>
	)
}
