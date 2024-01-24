import React from "react";
import { Link } from "react-router-dom";
import moreIcon from "../../../../assets/icons/moreicon.svg";

export default function RelatedNickname({ searchResult, displayedItems }) {
  return (
    <>
      <div className="related-nickname-container"></div>
      <div className="more-details">
        <Link
          to={`/${searchResult.content}/related_nickname_more`}
          className="more-link"
        >
          <h3>더보기</h3>
          <img src={moreIcon} alt="moreIcon" className="more-icon" />
        </Link>
      </div>
    </>
  );
}
