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
import { RankingData } from "../../../../modules/api/search";
import { TotalRankingData } from "../../../../modules/api/search";
import Pagination from "../pagination/Pagination";

export default function Ranking() {
  const dropdownItems = ["Season 1", "Season 2"]; // 시즌 선택 데이터
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);
  const [seasonNum, SetSeasonNum] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const [SearchData, setSearchData] = useState(null);
  const [searchedNickname, setSearchedNickname] = useState("");
  const [userRankData, setUserRankData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [updatedResults, setUpdatedResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // 검색 중 여부를 나타내는 상태
  const dropdownRef = useRef(null);

  const [rankData, setRankData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [isClicked, setIsClicked] = useState(false);

  const [totalPageNumber, setTotalPageNumber] = useState(null);
  //const pageNumber = "1"; // 추후 수정 -------

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedItem === dropdownItems[0]) {
          SetSeasonNum("1");
        }
        if (selectedItem === dropdownItems[1]) {
          SetSeasonNum("2");
        }

        const data = await TotalRankingData(pageNumber, seasonNum);
        setRankData(data.result);
        setTotalPageNumber(data.result.total_page_num);
        setSearchData(data.result.totalRank);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [pageNumber, selectedItem]);

  useEffect(() => {
    if (rankData) {
      console.log("전체 랭킹 데이터:", rankData);
    }
  }, [rankData]);

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

    // Season에 따른 seasonNum 상태 업데이트
    if (item === dropdownItems[0]) {
      SetSeasonNum("1");
    } else if (item === dropdownItems[1]) {
      SetSeasonNum("2");
    }

    setDropdownOpen(false);

    // 검색어 초기화
    setSearchedNickname("");
    const inputField = document.querySelector(".tier-search input");
    if (inputField) {
      inputField.value = ""; // 입력 필드 초기화
    }
  };

  const handleTierStandardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTierSearchButtonClick = () => {
    setIsClicked(true);
    rankingSearch();
  };

  const rankingSearch = async () => {
    //userRank 검색

    try {
      const data = await RankingData(pageNumber, seasonNum, searchedNickname);
      setUserRankData(data.result.userRank);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  }; //api 연결할 부분

  useEffect(() => {
    //setPageNumber(userRankData.pageNum);
    setPageNumber(1); //임시
    setSearchResult(userRankData.nickname);
  }, [userRankData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TotalRankingData(pageNumber, seasonNum);
        const updatedResults = data.result.totalRank.map((data) => ({
          ...data,
          isHighlighted:
            searchResult &&
            data.nickname.toLowerCase() === searchResult.toLowerCase(),
        }));
        setUpdatedResults(updatedResults);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [pageNumber, searchResult]);

  useEffect(() => {
    handleSearch();
  }, [searchedNickname]);

  const handleSearch = async () => {
    setIsSearching(true); // 검색 중임을 표시

    const searchedString = searchedNickname.trim().toLowerCase();

    try {
      if (selectedItem === dropdownItems[0]) {
        SetSeasonNum("1");
      } else if (selectedItem === dropdownItems[1]) {
        SetSeasonNum("2");
      }

      const data = await TotalRankingData(pageNumber, seasonNum);
      setSearchData(data.result.totalRank);

      if (searchedString === "") {
        // 검색어가 비어있는 경우, 전체 랭킹 데이터 표시
        setUpdatedResults(data.result.totalRank);
      } else {
        // 검색어에 따라 데이터 필터링 및 하이라이트
        const updatedResults = data.result.totalRank.map((data) => ({
          ...data,
          isHighlighted:
            searchedString &&
            data.nickname.toLowerCase().includes(searchedString),
        }));
        setUpdatedResults(updatedResults);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }

    setIsSearching(false); // 검색 완료
  };

  const handleInputChange = (e) => {
    setSearchedNickname(e.target.value);
    if (!e.target.value) {
      console.log("입력된 값 없음");
      setIsClicked(false);
    }
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      setIsClicked(true);
      rankingSearch();
    } else if (e.key === "Backspace" && searchedNickname === "") {
      // Backspace 키를 누르고 검색어가 비어있는 경우, 전체 랭킹 데이터 표시
      setUpdatedResults(SearchData);
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
              {searchedNickname === "" && ( //검색어가 없을  때
                <>
                  {SearchData &&
                    SearchData.map((data) => (
                      <div
                        key={data.nickname}
                        className={`ranking-records ${
                          data.isHighlighted ? "highlighted-row" : ""
                        }`}
                      >
                        <div className="table-rank">{data.ranking}</div>
                        <div className="table-tier">
                          {
                            <img
                              src={getTierIcon(data.tier)}
                              alt="result.tier"
                              className="tier-icon"
                            />
                          }
                        </div>
                        <div className="table-nickname">{data.nickname}</div>
                        <div className="table-status">
                          {data.status_message}
                        </div>
                        <div className="table-post">{data.sentimentCount}</div>
                        <div className="table-like">{data.totalLikes}</div>
                      </div>
                    ))}
                </>
              )}
              {searchedNickname !== "" && ( //검색어가 있을 때
                <>
                  {isClicked &&
                    updatedResults.filter((data) => data.isHighlighted) //검색어와 일치하는 데이터 x
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
                  {updatedResults.filter((data) => data.isHighlighted) //검색어와 일치하는 데이터 o
                    .length !== 0 && (
                    <>
                      {updatedResults &&
                        updatedResults.map((data) => (
                          <div
                            key={data.nickname}
                            className={`ranking-records ${
                              data.isHighlighted ? "highlighted-row" : ""
                            }`}
                          >
                            <div className="table-rank">{data.ranking}</div>
                            <div className="table-tier">
                              <img
                                src={getTierIcon(data.tier)}
                                alt="result.tier"
                                className="tier-icon"
                              />
                            </div>
                            <div className="table-nickname">
                              {data.nickname}
                            </div>
                            <div className="table-status">
                              {data.status_message}
                            </div>
                            <div className="table-post">
                              {data.sentimentCount}
                            </div>
                            <div className="table-like">{data.totalLikes}</div>
                          </div>
                        ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="pagination-container">
          {Array.isArray(SearchData) && (
            <Pagination
              setCursorId={setPageNumber}
              cursorId={pageNumber}
              setPageNum={setTotalPageNumber}
              pageNum={totalPageNumber}
            />
          )}
        </div>
      </div>
    </>
  );
}
