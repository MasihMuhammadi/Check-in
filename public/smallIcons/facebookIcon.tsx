import React from "react";

const FacebookIcon = ({ width, height }: { width: any; height: any }) => {
  return (
    <>
      <svg
        width={width}
        height={width}
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector"
          d="M65.0001 0C29.1015 0 0 29.2793 0 65.3973C0 98.039 23.7695 125.094 54.8438 130V84.301H38.3398V65.3973H54.8438V50.9895C54.8438 34.5993 64.5477 25.5458 79.395 25.5458C86.5066 25.5458 93.9452 26.8231 93.9452 26.8231V42.917H85.7487C77.6744 42.917 75.1563 47.9581 75.1563 53.1301V65.3973H93.1834L90.3019 84.301H75.1563V130C106.23 125.094 130 98.039 130 65.3973C130 29.2793 100.898 0 65.0001 0Z"
          fill="black"
        />
      </svg>
    </>
  );
};

export default FacebookIcon;
