import React from "react";

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};
const StarRating = ({maxRating = 5}) => {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({length: maxRating}, (_,i) =>(
            <span>S{i+1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
};

export default StarRating;