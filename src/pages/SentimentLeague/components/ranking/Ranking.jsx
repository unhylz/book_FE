import React, { useState, useEffect, useRef } from "react";
import dropdown1Icon from "../../../../assets/icons/dropdown1.svg";
import dropdown2Icon from "../../../../assets/icons/dropdown2.svg";
import tierstandardIcon from "../../../../assets/icons/tierstandard.svg";
import RankingModal from "../rankingmodal/RankingModal";
import TierSearchIcon from "../../../../assets/icons/tiersearch.svg";
import { rankingDummy } from "./rankingDummy";
import RookieIcon from "../../../../assets/tiers/루키.svg";
import SilverIcon from "../../../../assets/tiers/실버.svg";
import GoldIcon from "../../../../assets/tiers/골드.svg";
import DiaIcon from "../../../../assets/tiers/다이아.svg";
import MasterIcon from "../../../../assets/tiers/마스터.svg";
import GrandMasterIcon from "../../../../assets/tiers/그랜드마스터.svg";
import x_circleIcon from "../../../../assets/icons/x-circle.svg";
import "./Ranking.scss";

export default function Ranking() {
  //티어 아이콘 색상 변경용
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

  const dropdownItems = ["Season 2", "Season 1"]; // 시즌 선택 데이터
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);
  const [searchedNickname, setSearchedNickname] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [updatedResults, setUpdatedResults] = useState([]);
  const dropdownRef = useRef(null);

  const rankingResults = rankingDummy.filter(
    (data) => data.season === selectedItem
  );

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
    ///*
    setSearchedNickname("");
    const inputField = document.querySelector(".tier-search input");
    if (inputField) {
      inputField.value = ""; // 입력 필드 초기화
    }
    //*/
  };

  const handleTierStandardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTierSearchButtonClick = () => {
    //console.log("검색 버튼 클릭됨");
    highlightRows(searchedNickname);
    //setSearchedNickname("");
  };

  const handleInputChange = (e) => {
    //console.log("setSearchedNickname: ", e.target.value);
    setSearchedNickname(e.target.value);
    highlightRows(e.target.value);
    //highlightRows(searchedNickname);
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      //console.log("Enter 키 눌림");
      highlightRows(searchedNickname);
    }
  };

  const highlightRows = (searchedNickname) => {
    const searchedString = searchedNickname.trim().toLowerCase();
    //console.log("searchedString: ", searchedString);

    const updatedResults = rankingResults.map((data) => ({
      ...data,
      isHighlighted:
        searchedString && data.nickname.toLowerCase().includes(searchedString),
    }));

    setUpdatedResults(updatedResults);
    //console.log(updatedResults);
  };

  return (
    <>
      <div className="ranking-container">
        <div className="ranking-info" ref={dropdownRef}>
          <p className="ranking-title">Ranking</p>
          <div className="dropdown-btn" onClick={toggleDropdown}>
            <p className="ranking-season">{selectedItem}</p>
            <img
              src={isDropdownOpen ? dropdown2Icon : dropdown1Icon}
              alt="Dropdown Icon"
              className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {dropdownItems.map((item) => (
                  <p key={item} onClick={() => handleItemClick(item)}>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="tier-standard" onClick={handleTierStandardClick}>
            <img
              src={tierstandardIcon}
              alt="tierstandardIcon"
              className="tier-standard-icon"
            />
            <p>티어 기준</p>
          </div>
          {isModalOpen && <RankingModal onClose={handleCloseModal} />}

          {/* 검색창 */}
          <div className="tier-search">
            {/* 검색 버튼 */}
            <div
              className="tier-search-btn"
              onClick={handleTierSearchButtonClick}
            >
              <img src={TierSearchIcon} alt="TierSearch" />
            </div>
            <input
              type="input"
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
              onKeyUp={handleInputKeyUp}
            />
          </div>
        </div>
        <div className="ranking-table-container">
          <div className="ranking-table-contents">
            <div className="ranking-columns">
              <div className="table-rank">순위</div>
              <div className="table-tier">티어</div>
              <div className="table-nickname">닉네임</div>
              <div className="table-status">상태 메시지</div>
              <div className="table-post">작성 수</div>
              <div className="table-like">추천 수</div>
            </div>
            <div className="ranking-rows">
              {searchedNickname === "" && (
                <>
                  {rankingResults.map((data) => (
                    <div
                      key={data.nickname}
                      className={`ranking-records ${
                        data.isHighlighted ? "highlighted-row" : ""
                      }`}
                    >
                      <div className="table-rank">{data.rank}</div>
                      <div className="table-tier">
                        <img
                          src={getTierIcon(data.tier)}
                          alt="result.tier"
                          className="tier-icon"
                        />
                      </div>
                      <div className="table-nickname">{data.nickname}</div>
                      <div className="table-status">{data.statusMessage}</div>
                      <div className="table-post">{data.postCount}</div>
                      <div className="table-like">{data.likes}</div>
                    </div>
                  ))}
                </>
              )}
              {searchedNickname !== "" && (
                <>
                  {updatedResults.filter((data) => data.isHighlighted)
                    .length === 0 && (
                    <>
                      <div className="nickname-search-results">
                        <img
                          src={x_circleIcon}
                          alt="x_circleIcon"
                          className="x-circle-icon"
                        />
                        <p>해당 닉네임은 존재하지 않습니다.</p>
                      </div>
                    </>
                  )}
                  {updatedResults.filter((data) => data.isHighlighted)
                    .length !== 0 && (
                    <>
                      {updatedResults.map((data) => (
                        <div
                          key={data.nickname}
                          className={`ranking-records ${
                            data.isHighlighted ? "highlighted-row" : ""
                          }`}
                        >
                          <div className="table-rank">{data.rank}</div>
                          <div className="table-tier">
                            <img
                              src={getTierIcon(data.tier)}
                              alt="result.tier"
                              className="tier-icon"
                            />
                          </div>
                          <div className="table-nickname">{data.nickname}</div>
                          <div className="table-status">
                            {data.statusMessage}
                          </div>
                          <div className="table-post">{data.postCount}</div>
                          <div className="table-like">{data.likes}</div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
