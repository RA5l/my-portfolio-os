import { motion, type Easing } from "framer-motion";

interface RLogoLoadingProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  loop?: boolean;
}

export default function RLogoLoading({ 
  size = 200, 
  className = "", 
  color = "#000000", 
  strokeWidth = 3,
  loop = true
}: RLogoLoadingProps) {
  
  const ellipse1 = { cx: 78, cy: 89, rx: 18, ry: 64, rotation: 26 };
  const ellipse2 = { cx: 104, cy: 81, rx: 48, ry: 31, rotation: -27 };
  const ellipse3 = { cx: 105, cy: 129, rx: 18, ry: 61, rotation: -47 };

  const getCircumference = (rx: number, ry: number) => {
    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  };

  const circ1 = getCircumference(ellipse1.rx, ellipse1.ry);
  const circ2 = getCircumference(ellipse2.rx, ellipse2.ry);
  const circ3 = getCircumference(ellipse3.rx, ellipse3.ry);

  const totalDuration = 2.8;
  const easeFunction: Easing = "easeInOut";

  const getMotionProps = (circumference: number) => ({
    animate: loop ? {
      strokeDashoffset: [circumference, 0, 0, -circumference],
      opacity: [0, 1, 1, 0]
    } : { 
      strokeDashoffset: 0,
      opacity: 1
    },
    transition: loop ? {
      duration: totalDuration,
      times: [0, 0.3, 0.7, 1],
      ease: easeFunction,
      repeat: Infinity
    } : {
      duration: 1.2,
      ease: easeFunction
    }
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <motion.ellipse
          cx={ellipse1.cx}
          cy={ellipse1.cy}
          rx={ellipse1.rx}
          ry={ellipse1.ry}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          transform={`rotate(${ellipse1.rotation} ${ellipse1.cx} ${ellipse1.cy})`}
          strokeDasharray={`${circ1} ${circ1}`}
          {...getMotionProps(circ1)}
        />
        <motion.ellipse
          cx={ellipse2.cx}
          cy={ellipse2.cy}
          rx={ellipse2.rx}
          ry={ellipse2.ry}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          transform={`rotate(${ellipse2.rotation} ${ellipse2.cx} ${ellipse2.cy})`}
          strokeDasharray={`${circ2} ${circ2}`}
          {...getMotionProps(circ2)}
        />
        <motion.ellipse
          cx={ellipse3.cx}
          cy={ellipse3.cy}
          rx={ellipse3.rx}
          ry={ellipse3.ry}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          transform={`rotate(${ellipse3.rotation} ${ellipse3.cx} ${ellipse3.cy})`}
          strokeDasharray={`${circ3} ${circ3}`}
          {...getMotionProps(circ3)}
        />
      </g>
    </svg>
  );
}