// SideAd.js
import React from "react";
import "./SideAd.scss";
import Side_Ad from "../../../../assets/ad/Side_Ad.svg";

export default function SideAd() {
  return (
    <div className="side-ad">
      {/* 광고 내용 */}
      <img src={Side_Ad} alt="Side Ad" />
    </div>
  );
}
