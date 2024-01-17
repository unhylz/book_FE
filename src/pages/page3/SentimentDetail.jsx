import { FaUserCircle } from "react-icons/fa";
import './SentimentDetail.scss'
//<FaUserCircle />

function MyPage() {
    // 가정한 사용자 데이터, 실제 데이터로 대체 필요
    const sentimentData = {
        sort: 'Sentiment',
        title: '플러터 프로그래밍 책 후기',
        book: 'Must Have 코드팩토리의 플러터 프로그래밍',
        author: '(최지호/골든래빗)',
        name: 'Paul',
        date: '23/12/18(월요일) * 15:05',
        text: '플러터 프로그래밍을 인강이 아닌 책으로 배워봤다.\n이 책에서는 플러터를 포함하여 Dart언어와 Firebase를 추가로 알려준다.\n640페이지의 많은 양으로 자세히 배울 수 있다.',
        star: '★★★★★ 5.0',
    };
  
    return (
        <div className="title-container">
            <h4 className="sort">{sentimentData.sort}</h4>
            <h2 className="title">{sentimentData.title}</h2>
            <h3 className="book">{sentimentData.book}</h3>
            <h5 className="author">{sentimentData.author}</h5>
            <div className="user">
                <FaUserCircle className="userimg"/>
                <div className="info">
                    <div className="name">{sentimentData.name}</div>
                    <div className="date">{sentimentData.date}</div>
                </div>
                <div className="star">{sentimentData.star}</div>
            </div>
            <div className="text-container">{sentimentData.text}</div>
        </div>
    );
  }
  
  export default MyPage;