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
  };

  const handleTierStandardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTierSearchButtonClick = () => {
    console.log("검색 버튼 클릭됨");
    console.log(setSearchedNickname.value);
    highlightRows();
  };

  const handleInputChange = (e) => {
    setSearchedNickname(e.target.value);
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      console.log("Enter 키 눌림");
      console.log(setSearchedNickname.value);
      highlightRows();
    }
  };

  const highlightRows = () => {
    const searchedString =
      typeof searchedNickname === "string" ? searchedNickname : "";

    const updatedResults = rankingDummy.map((data) => ({
      ...data,
      isHighlighted:
        searchedString &&
        data.nickname.toLowerCase().includes(searchedString.toLowerCase()),
    }));

    const hasMatch = updatedResults.some((data) => data.isHighlighted);

    if (hasMatch) {
      setSearchedNickname(updatedResults);
    } else {
      // 만약 일치하는 값이 없으면 테이블을 초기화
      setSearchedNickname([]);
    }
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
          <table className="ranking-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>티어</th>
                <th>닉네임</th>
                <th>상태 메시지</th>
                <th>작성 수</th>
                <th>추천 수</th>
              </tr>
            </thead>

            <tbody>
              {rankingResults.map((data) => (
                <tr
                  key={data.id}
                  style={{
                    backgroundColor: data.isHighlighted
                      ? "$green"
                      : "transparent",
                  }}
                >
                  <td>{data.rank}</td>
                  <td>
                    <img
                      src={getTierIcon(data.tier)}
                      alt="result.tier"
                      className="tier-icon"
                    />
                  </td>
                  <td>{data.nickname}</td>
                  <td>{data.statusMessage}</td>
                  <td>{data.postCount}</td>
                  <td>{data.likes}</td>
                </tr>
              ))}
              {!searchedNickname && rankingResults.length === 0 && (
                <tr>
                  <td colSpan="6">해당 닉네임이 존재하지 않습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
