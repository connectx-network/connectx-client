type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  mail: (props: IconProps) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8288 8.30603L11.9188 11.4541C11.1789 12.0342 10.1416 12.0342 9.40168 11.4541L5.45813 8.30603"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.31392 3.20837H14.9562C16.2023 3.22235 17.3883 3.74914 18.238 4.66606C19.0878 5.58298 19.527 6.80998 19.4535 8.06132V14.0452C19.527 15.2965 19.0878 16.5235 18.238 17.4405C17.3883 18.3574 16.2023 18.8842 14.9562 18.8981H6.31392C3.63734 18.8981 1.83337 16.7207 1.83337 14.0452V8.06132C1.83337 5.38587 3.63734 3.20837 6.31392 3.20837Z"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  profile: (props: IconProps) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="10.6141"
        cy="6.67149"
        rx="4.37986"
        ry="4.37986"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.6667 17.1428C3.66553 16.8349 3.73439 16.5308 3.86807 16.2535C4.2876 15.4144 5.47067 14.9697 6.45236 14.7683C7.16036 14.6172 7.87813 14.5163 8.60034 14.4663C9.93746 14.3488 11.2823 14.3488 12.6194 14.4663C13.3416 14.5169 14.0593 14.6178 14.7674 14.7683C15.7491 14.9697 16.9321 15.3724 17.3517 16.2535C17.6205 16.8188 17.6205 17.4752 17.3517 18.0406C16.9321 18.9216 15.7491 19.3244 14.7674 19.5174C14.0602 19.6747 13.3422 19.7785 12.6194 19.8278C11.5311 19.9201 10.4377 19.9369 9.3471 19.8782C9.09538 19.8782 8.85206 19.8782 8.60034 19.8278C7.88027 19.7791 7.16498 19.6753 6.46075 19.5174C5.47067 19.3244 4.29599 18.9216 3.86807 18.0406C3.73507 17.7601 3.66628 17.4534 3.6667 17.1428Z"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  rightArrow: (props: IconProps) => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6.5C0 6.05127 0.363769 5.6875 0.8125 5.6875H9.87179L5.91095 1.72666C5.58722 1.40293 5.59186 0.876646 5.92125 0.558678C6.24252 0.248547 6.75305 0.253051 7.0688 0.568802L12.9356 6.43565C12.9712 6.47119 12.9712 6.52881 12.9356 6.56435L7.07001 12.43C6.75521 12.7448 6.2448 12.7448 5.93001 12.43C5.61623 12.1162 5.61509 11.6078 5.92746 11.2926L9.87179 7.3125H0.8125C0.363769 7.3125 0 6.94873 0 6.5Z"
        fill="white"
      />
    </svg>
  ),
  lock: (props: IconProps) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.0548 8.6605V6.69242C15.0548 4.38884 13.1866 2.52067 10.883 2.52067C8.57943 2.51059 6.70393 4.36959 6.69385 6.67409V6.69242V8.6605"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.3762 19.4788H7.372C5.4525 19.4788 3.896 17.9232 3.896 16.0028V12.0712C3.896 10.1508 5.4525 8.59521 7.372 8.59521H14.3762C16.2957 8.59521 17.8522 10.1508 17.8522 12.0712V16.0028C17.8522 17.9232 16.2957 19.4788 14.3762 19.4788Z"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8743 13.0192V15.0551"
        stroke="#807A7A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.0005 5.02721C14.8632 4.99855 16.6646 5.69251 18.0267 6.96346L21.6955 3.37596C19.3417 1.17039 16.2259 -0.0390273 13.0005 0.000960935C10.5905 0.000404079 8.22797 0.670256 6.17696 1.93561C4.12596 3.20096 2.46738 5.01192 1.38672 7.16596L5.59047 10.4297C6.10448 8.86678 7.09614 7.50463 8.42559 6.53535C9.75505 5.56607 11.3552 5.03856 13.0005 5.02721Z"
        fill="#E43E2B"
      />
      <path
        d="M25.4801 13.2901C25.4954 12.3964 25.4031 11.5042 25.2051 10.6326H13.0001V15.4576H20.1651C20.0292 16.3035 19.7236 17.1132 19.2667 17.838C18.8098 18.5628 18.211 19.1877 17.5064 19.6751L21.6089 22.8526C22.8874 21.6182 23.8929 20.1293 24.5604 18.4822C25.2278 16.8351 25.5424 15.0663 25.4839 13.2901H25.4801Z"
        fill="#3B7DED"
      />
      <path
        d="M5.60543 15.5716C5.3212 14.744 5.17467 13.8754 5.17168 13.0003C5.17686 12.1267 5.31814 11.2592 5.59043 10.4291L1.38668 7.16534C0.47492 8.97552 0 10.9741 0 13.001C0 15.0278 0.47492 17.0264 1.38668 18.8366L5.60543 15.5716Z"
        fill="#F0B501"
      />
      <path
        d="M13.0004 26.0008C16.167 26.0903 19.2476 24.9635 21.6091 22.852L17.5066 19.6745C16.1764 20.5663 14.6011 21.0207 13.0004 20.9745C11.3565 20.9647 9.7575 20.4376 8.43013 19.4679C7.10275 18.4982 6.11443 17.1351 5.60536 15.572L1.40161 18.837C2.47936 20.9901 4.13522 22.8006 6.18375 24.0659C8.23229 25.3311 10.5926 26.0011 13.0004 26.0008Z"
        fill="#2BA24C"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),

  facebook: (props: IconProps) => (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="30.7551" height="30.7551" rx="15.3776" fill="#1977F3" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.0966 30.5151C17.214 30.6726 16.3054 30.7547 15.3776 30.7547C14.5553 30.7547 13.748 30.6902 12.9606 30.5659V20.2758H8.78748V15.5406H12.9606V11.9315C12.9606 7.82687 15.4129 5.5589 19.1683 5.5589C20.4007 5.57606 21.6302 5.68305 22.847 5.87899V9.91056H20.7734C18.732 9.91056 18.0966 11.1732 18.0966 12.47V15.5412H22.6545L21.9259 20.2758H18.0966V30.5151Z"
        fill="white"
      />
    </svg>
  ),
  shapeBackground1: (props: IconProps) => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="#5669FF"
        d="M36.8,-62.2C47.4,-57.7,55.2,-47.1,63.9,-35.7C72.6,-24.3,82.1,-12.1,82.3,0.1C82.5,12.4,73.3,24.7,66.1,38.5C58.8,52.3,53.3,67.6,42.6,73.4C31.9,79.2,15.9,75.6,3.2,70.1C-9.6,64.5,-19.2,57.2,-31.5,52.3C-43.8,47.4,-58.8,45,-62.5,36.7C-66.2,28.4,-58.6,14.2,-58.7,-0.1C-58.9,-14.3,-66.7,-28.7,-66.5,-43C-66.2,-57.3,-57.8,-71.5,-45.4,-74.9C-33,-78.2,-16.5,-70.7,-1.7,-67.8C13.2,-64.9,26.3,-66.7,36.8,-62.2Z"
        transform="translate(100 100)"
      />
    </svg>
  ),

  shapeBackground2: (props: IconProps) => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="#BF56FF"
        d="M25,-28.7C40.8,-23,67.6,-26.9,80.2,-18.8C92.9,-10.7,91.3,9.2,83.4,25C75.4,40.9,61,52.6,46.1,62.8C31.1,73.1,15.6,82,1.7,79.7C-12.2,77.4,-24.5,64,-36.2,52.6C-47.8,41.3,-58.9,32,-58.9,21.6C-58.9,11.2,-47.9,-0.4,-43.3,-13.9C-38.7,-27.5,-40.6,-43,-34.5,-51.8C-28.4,-60.5,-14.2,-62.4,-4.8,-55.9C4.7,-49.3,9.3,-34.3,25,-28.7Z"
        transform="translate(100 100)"
      />
    </svg>
  ),
};
