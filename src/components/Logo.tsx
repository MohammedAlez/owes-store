import React from "react";

interface LogoProps {
  className?: string;
  showSubtext?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showSubtext = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      o: "h-8 w-8 text-xl",
      store: "text-sm",
      wes: "text-xs",
      gap: "gap-1.5",
      container: "py-1",
      subtext: "text-[9px]"
    },
    md: {
      o: "h-11 w-11 text-2xl",
      store: "text-lg",
      wes: "text-sm",
      gap: "gap-2",
      container: "py-1.5",
      subtext: "text-[10px]"
    },
    lg: {
      o: "h-20 w-20 text-5xl",
      store: "text-3xl",
      wes: "text-2xl",
      gap: "gap-3.5",
      container: "py-3",
      subtext: "text-sm"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div id="owes-logo-container" className={`flex flex-col items-center select-none font-sans ${className}`}>
      <div className={`flex items-center ${currentSize.gap}`}>
        {/* Official Brand Logo Image */}
        <div
          id="owes-logo-img-wrapper"
          className={`${currentSize.o} overflow-hidden rounded-full border border-[#c07a43]/50 shadow-md bg-zinc-900 shrink-0 flex items-center justify-center`}
        >
          <img
            src="/logo.jpg"
            alt="OWES Store"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* OWES STORE brand text */}
        <div id="owes-logo-text" className="flex flex-col justify-center leading-none text-left">
          <span 
            className={`${size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-base"} font-extrabold text-white uppercase tracking-wider`}
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            OWES
          </span>
          <span 
            className={`${size === "lg" ? "text-sm" : size === "md" ? "text-xs" : "text-[10px]"} font-bold text-[#c07a43] tracking-[0.25em] uppercase`}
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            STORE
          </span>
        </div>
      </div>
      
      {showSubtext && (
        <span 
          id="owes-logo-subtext" 
          className={`${currentSize.subtext} mt-1.5 text-[#a1a1aa] tracking-widest uppercase font-mono font-medium`}
        >
          Produits Originaux USA
        </span>
      )}
    </div>
  );
}
