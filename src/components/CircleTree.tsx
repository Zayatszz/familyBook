import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

type Person = {
  id: string;
  name: string;
  imageUrl: string;
};

type CircleTreeProps = {
  centerPerson: Person;
  children: Person[];
  onSelectPerson: (id: string) => void;
};

const AnimatedCircleTree: React.FC<CircleTreeProps> = ({
  centerPerson,
  children,
  onSelectPerson,
}) => {
  const radius = 300;
  const center = { x: 300, y: 400 };
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const newPositions = children.map((_, index) => {
      const angle = (index / children.length) * 2 * Math.PI;
      const x = Math.cos(angle) * radius + center.x;
      const y = Math.sin(angle) * radius + center.y;
      return { x, y };
    });
    setPositions(newPositions);
  }, [children]);

  return (
    <div className="relative w-[600px] h-[800px] mx-auto my-10">
      {/* SVG тойрог + зурааснууд */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <circle
          cx={center.x}
          cy={center.y}
          r={radius}
          stroke="#bbb"
          strokeWidth="1"
          fill="none"
        />
        {positions.map((pos, idx) => (
          <line
            key={idx}
            x1={center.x}
            y1={center.y}
            x2={pos.x}
            y2={pos.y}
            stroke="#ccc"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Төв хүн */}
   <motion.div
  className="absolute z-10 flex flex-col items-center justify-center text-center"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5 }}
  style={{
    left: `250px`,
    top: `350px`,
    transform: "translate(-50%, -50%)",
  }}
>
  <img
    src={centerPerson.imageUrl}
    alt={centerPerson.name}
    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
  />
  <div className="mt-2 text-sm font-medium leading-tight">{centerPerson.name}</div>
</motion.div>


      {/* Хүүхдүүд (тархаж гарч ирэх анимэйшн) */}
      {positions.map((pos, index) => {
        const child = children[index];
        return (
          <motion.div
            key={child.id}
            className="absolute text-center cursor-pointer z-10"
            initial={{ left: `${center.x}px`, top: `${center.y}px`, opacity: 0 }}
            animate={{ left: `${pos.x}px`, top: `${pos.y}px`, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            style={{
              transform: "translate(-50%, -50%)",
              position: "absolute",
            }}
            onClick={() => onSelectPerson(child.id)}
          >
            <img
              src={child.imageUrl}
              alt={child.name}
              className="w-20 h-20 rounded-full border-2 border-gray-300 shadow"
            />
            <div className="mt-1 text-sm">{child.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedCircleTree;
