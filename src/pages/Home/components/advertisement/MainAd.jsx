// MainAd.js
import React from "react";
import "./MainAd.scss";
import Main_Ad from "../../../../assets/ad/Main_Ad.svg";

export default function MainAd() {
  return (
    <div className="main-ad">
      {/* 광고 내용 */}
      <img src={Main_Ad} alt="Main Ad" />
    </div>
  );
}
