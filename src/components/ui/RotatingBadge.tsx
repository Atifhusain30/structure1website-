'use client';

interface RotatingBadgeProps {
  text?: string;
  size?: number;
}

export default function RotatingBadge({ 
  text = 'SEAMLESS CONSTRUCTION • TURNKEY SOLUTIONS • STRUCTURE1 •',
  size = 160 
}: RotatingBadgeProps) {
  const radius = size / 2 - 10;

  return (
    <div 
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Rotating text - using CSS animation only for iOS compatibility */}
      <div className="absolute inset-0 rotating-badge">
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full"
        >
          <defs>
            <path
              id="circlePath"
              d={`M 80, 80 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text className="fill-primary-black text-[10px] font-medium tracking-[0.15em] uppercase">
            <textPath href="#circlePath">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
      
      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-heading font-bold text-lg">S1</span>
        </div>
      </div>
    </div>
  );
}

