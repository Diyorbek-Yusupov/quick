import React from "react";

const GoogleIcon = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_295_3296)">
      <path
        d="M3.83 9.3875C4.87001 7.31656 6.46547 5.57564 8.43804 4.35934C10.4106 3.14303 12.6826 2.49927 15 2.5C18.3688 2.5 21.1988 3.7375 23.3625 5.75625L19.7788 9.34125C18.4825 8.1025 16.835 7.47125 15 7.47125C11.7438 7.47125 8.9875 9.67125 8.00625 12.625C7.75625 13.375 7.61375 14.175 7.61375 15C7.61375 15.825 7.75625 16.625 8.00625 17.375C8.98875 20.33 11.7438 22.5288 15 22.5288C16.6813 22.5288 18.1125 22.085 19.2325 21.335C19.8818 20.9075 20.4377 20.3528 20.8665 19.7044C21.2953 19.056 21.5882 18.3273 21.7275 17.5625H15V12.7275H26.7725C26.92 13.545 27 14.3975 27 15.2838C27 19.0913 25.6375 22.2963 23.2725 24.4713C21.205 26.3813 18.375 27.5 15 27.5C13.3583 27.5007 11.7325 27.1778 10.2157 26.5498C8.69881 25.9219 7.32056 25.0012 6.1597 23.8403C4.99884 22.6794 4.07812 21.3012 3.45017 19.7843C2.82222 18.2675 2.49934 16.6417 2.5 15C2.5 12.9825 2.9825 11.075 3.83 9.3875Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_295_3296">
        <rect width="2em" height="2em" rx={12} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default GoogleIcon;