// StarRating.jsx
import React, { useState, useEffect, useCallback } from "react";
import "./StarRating.scss"; // SCSS 파일 import

export default function StarRating({ averageRates }) {
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([
    [0, 0, 0, 0, 0], // 첫 번째 별점 집합
    [0, 0, 0, 0, 0], // 두 번째 별점 집합
  ]);

  const calcStarRates = useCallback(() => {
    const newRatesResArr = averageRates.map((averageRate) => {
      let tempStarRatesArr = [0, 0, 0, 0, 0];
      let starVerScore = (averageRate * 20 * 70) / 100;
      let idx = 0;
      while (starVerScore > 14) {
        tempStarRatesArr[idx] = 14;
        idx += 1;
        starVerScore -= 14;
      }
      tempStarRatesArr[idx] = starVerScore;
      return tempStarRatesArr;
    });

    return newRatesResArr;
  }, [averageRates]);

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, [averageRates, calcStarRates]);

  return (
    <div className="star-container">
      {ratesResArr.map((rates, setIdx) => (
        <div key={`ratingSet_${setIdx}`} className="rating-set">
          {STAR_IDX_ARR.map((item, idx) => (
            <span className="star_icon" key={`${item}_${idx}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="39"
                viewBox="0 0 14 13"
                fill="#cacaca"
              >
                <clipPath id={`${item}StarClip_${setIdx}`}>
                  <rect width={`${rates[idx]}`} height="39" />
                </clipPath>
                <path
                  id={`${item}Star_${setIdx}`}
                  d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                  transform="translate(-2 -2)"
                />
                <use
                  clipPath={`url(#${item}StarClip_${setIdx})`}
                  href={`#${item}Star_${setIdx}`}
                  fill="green"
                />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
