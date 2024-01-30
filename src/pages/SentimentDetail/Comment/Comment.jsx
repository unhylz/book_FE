import './Comment.scss';
import CommentDummy from './CommentDummy';
import userImg from "../../../assets/icons/user_Img.png";
import RookieIcon from "../../../assets/tiers/루키.svg";
import SilverIcon from "../../../assets/tiers/실버.svg";
import GoldIcon from "../../../assets/tiers/골드.svg";
import DiaIcon from "../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../assets/tiers/그랜드마스터.svg";
import Notification from '../../page1/notification/notification';



export default function CommentItem() {

	const getTierIcon = (tier) => {
    const tierIcons = {
      루키: RookieIcon,
      실버: SilverIcon,
      골드: GoldIcon,
      다이아: DiaIcon,
      마스터: MasterIcon,
      그랜드마스터: GrandMasterIcon,
    };

    const DefaultIcon = () => null;
    const formattedTier = tier.toLowerCase().replace(/\s/g, "");

    const SelectedIcon = tierIcons[formattedTier] || DefaultIcon;

    return SelectedIcon;
  };

	return (
		<div className='comment-list-item'>
			{CommentDummy.map((result) => (
				<div key={result.id} className="comment-result">
					<div className='list-top'>
						<div className='profile-box'>
							<img src={`../../../assets/icons/${result.profileImage}`} alt="Img" className="profile-image" style={{width: "50px", height: "50px"}}/>
						</div>
						<div className='info-box'>
							<div className='name-tier'>
								<div className='nickname'>{result.nickname}</div>
								<img
									src={getTierIcon(result.tier)}
									alt="result.tier"
									className="tier-icon"
								/>
							</div>
							<div className='time'>{result.writeDateTime}</div>
						</div>
					</div>
					<div className='comment-main'>
					<div className='content'>{Notification.content}</div>
					</div>
				</div>
			))}
			<div className="input-container">
				<textarea className="textarea" placeholder="댓글을 작성하세요"></textarea>
				<button className='comment-button'>{'작성하기'}</button>
			</div>
		</div>
	)
}