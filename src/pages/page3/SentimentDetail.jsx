import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import './SentimentDetail.scss'

import CommentItem from './Comment/Comment';

function SentimentDetail() {
    // 센티멘트 데이터
    const sentimentData = {
        sort: 'Sentiment',
        title: '플러터 프로그래밍 책 후기',
        book: 'Must Have 코드팩토리의 플러터 프로그래밍 (최지호/골든래빗)',
        author: '(최지호/골든래빗)',
        name: 'Paul',
        date: '23/12/18(월요일) * 15:05',
        text: '플러터 프로그래밍을 인강이 아닌 책으로 배워봤다.\n이 책에서는 플러터를 포함하여 Dart언어와 Firebase를 추가로 알려준다.\n640페이지의 많은 양으로 자세히 배울 수 있다.',
        star: '★★★★★ 5.0',
    };

    //상단 컴포넌트
    const DetailTop = () => {


        return (
            <div id="detail-top">
                <div className="top-header">
                    <div className="sort">{sentimentData.sort}</div>
                    <div className="title">{sentimentData.title}</div>
                    <div className="book-title">{sentimentData.book}</div>
                    {/* <div className="book-author">{sentimentData.author}</div> */}
                    <div className="writer-info-box">
                        <FaUserCircle className="profile-image"/>
                        <div className="nickname">Paul</div>
                        <div className="divider"></div>
                        <div className="date">2023/12/18(월요일) 15:05</div>
                    </div>
                    <div className="book-box">
                        <div className="image"></div>
                        <div className="divider"></div>
                        <div className="rating">★★★★★ 5.0</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="detail-top-main">
                    <div className="detail-main-text">{sentimentData.text}</div>
                    <div className="detail-main-image"></div>
                </div>
            </div>
        );
    }


    //하단 컴포넌트
    const DetailBottom = () => {


        return (
            <div id='detail-bottom'>
                <div className="update-delete-box">
                    <div className="update-button">{`수정하기`}</div>
                    <div className="delete-button">{`삭제하기`}</div>
                </div>
                <div className="bottom-button-box">
                    <div className="like-box">
                        <div className="like">{`좋아요 ${12}`}</div>
                        <div className="comment">{`댓글 ${3}`}</div>
                        <div className="scrap">{`스크랩 ${0}`}</div>
                    </div>
                    <div className="recommand-box">
                        <div className="recommand-button">{`추천하기`}</div>
                        <div className="scrap-button">{`스크랩`}</div>
                    </div>
                </div>
                <div className="comment-box">
                    <div className="comment-container">
                        <div className='list-top'>
                            <div className='profile-box'>
                                <FaUserCircle className="userimg"/>
                            </div>
                            <div className='info-box'>
                                <div className='nickname'>{`닉네임 A`}</div>
                                <div className='tier'></div>
                                <div className='time'>{`2023/12/18 15:10`}</div>
                            </div>
                        </div>
                        <div className='comment-main'>
                            <div className='content'>
                                {`플러터 어렵나요?`}
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="input-container">
                        <textarea className="textarea" placeholder="댓글을 작성하세요"></textarea>
                        <div className="comment-button-box">
                            <div className="disable-button">{'작성하기'}</div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
    // <div style={{ padding: '0 20px', display:'flex, flexDirection: 'column', gap:'30px'}}>
    //<CommentItem />
    //</div>
    
    //상세 화면 컴포넌트 
    return (
        <div id="board-detail-wrapper">
            <div className="detail-container">
                <DetailTop />
                <DetailBottom />
            </div>
        </div>
    );
  }
  
  export default SentimentDetail;