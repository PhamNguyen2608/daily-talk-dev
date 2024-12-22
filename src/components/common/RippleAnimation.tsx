import React, { useState, useEffect, useCallback } from 'react';

interface RippleProps {
  duration?: number;
  color?: string;
}

interface RippleStyle {
  left: number;
  top: number;
  diameter: number;
  opacity: number;
}

const RippleAnimation: React.FC<RippleProps> = ({
  duration = 850,
  color = 'rgba(255, 255, 255, 0.7)'
}) => {
  const [ripples, setRipples] = useState<RippleStyle[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    ripples.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setRipples((prevState) => prevState.filter((_, i) => i !== index));
      }, duration);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [ripples, duration]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const diameter = Math.max(rippleContainer.width, rippleContainer.height);
    const radius = diameter / 2;
    const x = event.clientX - rippleContainer.left - radius;
    const y = event.clientY - rippleContainer.top - radius;

    const newRipple = {
      left: x,
      top: y,
      diameter,
      opacity: 1
    };
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseDown={addRipple}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {ripples.map((ripple, index) => (
        <span
          key={index}
          style={{
            position: 'absolute',
            left: ripple.left,
            top: ripple.top,
            width: ripple.diameter,
            height: ripple.diameter,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: ripple.opacity,
            transform: 'scale(0)',
            animation: `ripple ${duration}ms linear`,
            pointerEvents: 'none'
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RippleAnimation;

