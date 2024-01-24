// StarRating.jsx
import React from "react";

export default function StarRating({ popularity }) {
  const fullStars = Math.floor(popularity);
  const percentage = (popularity - fullStars) * 100; // Declare percentage here
}
