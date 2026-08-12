type MinionVariant = "standard" | "stuart" | "kevin" | "bob";

type MinionCharacterProps = {
  variant?: MinionVariant;
  scale?: number;
  className?: string;
  flip?: boolean;
};

export default function MinionCharacter({
  variant = "standard",
  scale = 1,
  className = "",
  flip = false,
}: MinionCharacterProps) {
  const height = variant === "kevin" ? 96 : 84;
  const width = 64;
  const tall = variant === "kevin";
  const y = {
    arm: tall ? 58 : 52,
    body: tall ? 52 : 48,
    bodyLower: tall ? 56 : 52,
    pocket: tall ? 52 : 48,
    pocketLogo: tall ? 57 : 53,
    pocketText: tall ? 58.5 : 54.5,
    boot: tall ? 82 : 76,
    strap: tall ? 22 : 18,
    eye: tall ? 24 : 20,
    pupil: tall ? 25 : 21,
    shine: tall ? 23 : 19,
    mouth: tall ? 34 : 30,
    smile: tall ? 36 : 32,
    bobSmile: tall ? 38 : 34,
  };

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale}) ${flip ? "scaleX(-1)" : ""}`,
        transformOrigin: "bottom center",
      }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === "kevin" && (
          <>
            <path
              d="M28 8 C30 2, 34 2, 36 8 C38 2, 42 2, 44 8 C46 2, 48 6, 46 10"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M30 10 C32 4, 36 4, 38 10 C40 4, 42 4, 44 10"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}

        {variant === "bob" && (
          <path
            d="M24 12 C26 6, 30 6, 32 11 C34 6, 38 6, 40 12"
            stroke="#6B4C2A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Left arm */}
        <ellipse cx="12" cy={y.arm} rx="5" ry="7" fill="#111" />
        {/* Right arm */}
        <ellipse cx="52" cy={y.arm} rx="5" ry="7" fill="#111" />

        {/* Body */}
        <ellipse
          cx="32"
          cy={y.body}
          rx="22"
          ry={tall ? 30 : 26}
          fill="#F9E547"
        />
        <ellipse
          cx="32"
          cy={y.bodyLower}
          rx="20"
          ry="18"
          fill="#F5D73A"
        />

        {/* Overalls */}
        <path
          d={
            tall
              ? "M16 44 L16 78 Q32 84 48 78 L48 44 Q40 40 32 44 Q24 40 16 44 Z"
              : "M16 40 L16 72 Q32 78 48 72 L48 40 Q40 36 32 40 Q24 36 16 40 Z"
          }
          fill="#3D5A8C"
        />
        <path
          d={
            tall
              ? "M22 44 L22 34 L26 34 L26 42 M38 42 L38 34 L42 34 L42 44"
              : "M22 40 L22 30 L26 30 L26 38 M38 38 L38 30 L42 30 L42 40"
          }
          stroke="#2E4670"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Pocket */}
        <rect x="26" y={y.pocket} width="12" height="10" rx="2" fill="#2E4670" />
        <circle cx="32" cy={y.pocketLogo} r="3" fill="#1E3050" stroke="#F9E547" strokeWidth="0.8" />
        <text
          x="32"
          y={y.pocketText}
          textAnchor="middle"
          fill="#C0C0C0"
          fontSize="4.5"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          G
        </text>

        {/* Boots */}
        <ellipse cx="24" cy={y.boot} rx="8" ry="4" fill="#111" />
        <ellipse cx="40" cy={y.boot} rx="8" ry="4" fill="#111" />

        {/* Goggle strap */}
        <rect x="10" y={y.strap} width="44" height="7" rx="3.5" fill="#1a1a1a" />

        {variant === "stuart" ? (
          <>
            <circle cx="32" cy={y.eye} r="13" fill="#B8B8B8" stroke="#666" strokeWidth="1.5" />
            <circle cx="32" cy={y.eye} r="10" fill="#555" opacity="0.25" />
            <circle cx="32" cy={y.eye} r="8" fill="#fff" />
            <circle cx="32" cy={y.pupil} r="4.5" fill="#6B4226" />
            <circle cx="30" cy={y.shine} r="1.2" fill="#fff" />
          </>
        ) : (
          <>
            <circle cx="24" cy={y.eye} r="11" fill="#B8B8B8" stroke="#666" strokeWidth="1.5" />
            <circle cx="40" cy={y.eye} r="11" fill="#B8B8B8" stroke="#666" strokeWidth="1.5" />
            <circle cx="24" cy={y.eye} r="7.5" fill="#fff" />
            <circle cx="40" cy={y.eye} r="7.5" fill="#fff" />
            <circle cx="24" cy={y.pupil} r="4" fill="#6B4226" />
            <circle cx="40" cy={y.pupil} r="4" fill="#6B4226" />
            <circle cx="22.5" cy={y.shine} r="1" fill="#fff" />
            <circle cx="38.5" cy={y.shine} r="1" fill="#fff" />
          </>
        )}

        {/* Mouth */}
        {variant === "bob" ? (
          <path
            d={`M26 ${y.mouth} Q32 ${y.bobSmile} 38 ${y.mouth}`}
            stroke="#1a1a1a"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d={`M24 ${y.mouth} Q32 ${y.smile} 40 ${y.mouth}`}
            stroke="#1a1a1a"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
