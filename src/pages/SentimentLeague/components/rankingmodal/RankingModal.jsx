// RankingModal.jsx
import React from "react";
import xIcon from "../../../../assets/icons/x.svg";
import RookieIcon from "../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../assets/tiers/그랜드마스터.svg";
import "./RankingModal.scss";

export default function RankingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-info">
          <div className="close-container">
            <button className="close-button" onClick={onClose}>
              <img src={xIcon} alt={"xIcon"} className="x-icon"></img>
            </button>
          </div>
          <div className="modal-title">티어 기준</div>
          <div className="modal-tier">
            <div className="tier-info">
              <div className="tier-rookie">
                <div className="rookie">
                  <img
                    src={RookieIcon}
                    alt="RookieIcon"
                    className="tier-icons"
                  />
                  <p>루키</p>
                </div>
                <div className="tier-detail">
                  <p>센티먼트 0개 작성 시 루키</p>
                </div>
              </div>
              <div className="tier-silver">
                <div className="silver">
                  <img
                    src={SilverIcon}
                    alt="SilverIcon"
                    className="tier-icons"
                  />
                  <p>실버</p>
                </div>
                <div className="tier-detail">
                  <p>센티먼트 1개 작성</p>
                </div>
              </div>
              <div className="tier-gold">
                <div className="gold">
                  <img src={GoldIcon} alt="GoldIcon" className="tier-icons" />
                  <p>골드</p>
                </div>
                <div className="tier-detail">
                  <p>
                    센티먼트 5개 이상 작성 +<br />
                    추천 수 30개 이상
                  </p>
                </div>
              </div>
              <div className="tier-dia">
                <div className="dia">
                  <img src={DiaIcon} alt="DiaIcon" className="tier-icons" />
                  <p>다이아</p>
                </div>
                <div className="tier-detail">
                  <p>
                    센티먼트 10개 이상 작성 +<br />
                    추천 수 100개 이상
                  </p>
                </div>
              </div>
              <div className="tier-master">
                <div className="master">
                  <img
                    src={MasterIcon}
                    alt="MasterIcon"
                    className="tier-icons"
                  />
                  <p>마스터</p>
                </div>
                <div className="tier-detail">
                  <p>
                    센티먼트 30개 이상 작성 +<br />
                    추천 수 300개 이상
                  </p>
                </div>
              </div>
              <div className="tier-grandmaster">
                <div className="grandmaster">
                  <img
                    src={GrandMasterIcon}
                    alt="GrandMasterIcon"
                    className="tier-icons"
                  />
                  <p>그랜드마스터</p>
                </div>
                <div className="tier-detail">
                  <p>
                    센티먼트 50개 이상 작성 +<br />
                    추천 수 500개 이상
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
