import React from "react";

const FacebookIcon = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_295_3290)">
      <path
        d="M17.5 16.875H20.625L21.875 11.875H17.5V9.375C17.5 8.0875 17.5 6.875 20 6.875H21.875V2.675C21.4675 2.62125 19.9288 2.5 18.3038 2.5C14.91 2.5 12.5 4.57125 12.5 8.375V11.875H8.75V16.875H12.5V27.5H17.5V16.875Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_295_3290">
        <rect width={30} height={30} rx={12} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default FacebookIcon;
