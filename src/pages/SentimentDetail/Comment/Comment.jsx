import './Comment.scss';
import { FaUserCircle } from "react-icons/fa";



export default function CommentItem() {

    return (
        <div className='comment-list-item'>
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
    )
}