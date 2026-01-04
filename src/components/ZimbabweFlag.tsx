const ZimbabweFlag = ({ className = "w-6 h-4" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 900 450"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="900" height="450" fill="#006400" />
      <rect y="64" width="900" height="322" fill="#FFD200" />
      <rect y="128" width="900" height="194" fill="#D40000" />
      <rect y="192" width="900" height="66" fill="#000" />
      <polygon points="0,0 450,225 0,450" fill="#FFF" />
      <polygon points="0,25 400,225 0,425" fill="#000" />
      <polygon
        points="150,225 180,280 130,245 170,245 120,280"
        fill="#D40000"
        transform="translate(-20, 0)"
      />
      <path
        d="M130,160 L130,290 L200,290 L200,240 L160,240 L160,200 L200,200 L200,160 Z"
        fill="#FFD200"
        transform="translate(-10, 0) scale(0.6)"
      />
    </svg>
  );
};

export default ZimbabweFlag;
