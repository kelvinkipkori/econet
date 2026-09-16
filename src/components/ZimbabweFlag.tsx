const ZimbabweFlag = ({ className = "w-6 h-4" }: { className?: string }) => {
  return (
<svg
  className={className}
  viewBox="0 0 900 450"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Blue stripe */}
  <rect width="900" height="150" fill="#00209F" />

  {/* White stripe */}
  <rect y="150" width="900" height="150" fill="#FFFFFF" />

  {/* Green stripe */}
  <rect y="300" width="900" height="150" fill="#009543" />

  {/* Mokorotlo (Basotho hat) */}
  <g fill="#000000">
    <!-- Hat crown -->
    <path
      d="
        M450 172
        C430 180 416 198 404 218
        L390 242
        L410 250
        L490 250
        L510 242
        L496 218
        C484 198 470 180 450 172
        Z
      "
    />

    <!-- Hat brim -->
    <path
      d="
        M385 242
        C400 255 420 262 450 264
        C480 262 500 255 515 242
        L520 253
        C502 270 478 278 450 280
        C422 278 398 270 380 253
        Z
      "
    />

    <!-- Hat loop / peak -->
    <path
      d="
        M450 172
        C432 158 428 143 435 130
        C442 117 458 117 465 130
        C472 143 468 158 450 172
        Z
      "
    />

    <!-- Inner cutout of loop -->
    <path
      d="
        M450 162
        C440 151 439 141 444 134
        C448 128 452 128 456 134
        C461 141 460 151 450 162
        Z
      "
      fill="#FFFFFF"
    />

    <!-- Decorative brim cutouts -->
    <path
      d="M390 249 L405 252 L414 263 L400 259 Z"
      fill="#FFFFFF"
    />
    <path
      d="M410 254 L425 257 L435 269 L420 267 Z"
      fill="#FFFFFF"
    />
    <path
      d="M435 258 L450 259 L450 273 L440 270 Z"
      fill="#FFFFFF"
    />
    <path
      d="M450 259 L465 258 L460 270 L450 273 Z"
      fill="#FFFFFF"
    />
    <path
      d="M465 258 L480 254 L480 267 L460 270 Z"
      fill="#FFFFFF"
    />
    <path
      d="M480 254 L495 250 L500 259 L480 267 Z"
      fill="#FFFFFF"
    />
    <path
      d="M495 250 L510 246 L500 259 Z"
      fill="#FFFFFF"
    />
  </g>
</svg>
  );
};

export default ZimbabweFlag;
