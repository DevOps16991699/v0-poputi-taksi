interface PoputiLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

export function PoputiLogo({ size = "md", showText = true, className = "" }: PoputiLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, textSize: "text-xs" },
    md: { width: 60, height: 60, textSize: "text-sm" },
    lg: { width: 80, height: 80, textSize: "text-base" },
    xl: { width: 120, height: 120, textSize: "text-xl" },
  }

  const { width, height, textSize } = sizes[size]

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Green P shape with gradient */}
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        
        {/* P letter top curve */}
        <path
          d="M15 15 H70 Q85 15 85 35 Q85 55 70 55 H45"
          stroke="url(#greenGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* P letter vertical line */}
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="55"
          stroke="url(#greenGradient)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        
        {/* Road */}
        <path
          d="M25 55 L50 95 L75 55 Z"
          fill="#1F2937"
        />
        
        {/* Road dashed line */}
        <line
          x1="50"
          y1="60"
          x2="50"
          y2="68"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="73"
          x2="50"
          y2="81"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="85"
          x2="50"
          y2="91"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col items-center mt-1">
          <span className={`font-bold tracking-wide text-foreground ${textSize}`}>
            POPUTI
          </span>
          <div className="flex items-center gap-1">
            <span className="w-4 h-px bg-muted-foreground"></span>
            <span className={`text-muted-foreground tracking-widest ${size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-xs"}`}>
              TAKSI
            </span>
            <span className="w-4 h-px bg-muted-foreground"></span>
          </div>
        </div>
      )}
    </div>
  )
}

export function PoputiLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="greenGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      
      <path
        d="M15 15 H70 Q85 15 85 35 Q85 55 70 55 H45"
        stroke="url(#greenGradientIcon)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      
      <line
        x1="22"
        y1="22"
        x2="22"
        y2="55"
        stroke="url(#greenGradientIcon)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      
      <path
        d="M25 55 L50 95 L75 55 Z"
        fill="#1F2937"
      />
      
      <line x1="50" y1="60" x2="50" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="73" x2="50" y2="81" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="85" x2="50" y2="91" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
