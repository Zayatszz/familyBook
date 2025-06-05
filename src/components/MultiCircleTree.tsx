import React, { useState } from "react";
import { motion } from "framer-motion";

type Person = {
  id: string;
  name: string;
  imageUrl: string;
};

type MultiCircleTreeProps = {
  centerPerson: Person;
  children: Person[];
  grandChildrenMap: Record<string, Person[]>;
};

const MultiCircleTree: React.FC<MultiCircleTreeProps> = ({
  centerPerson,
  children,
  grandChildrenMap,
}) => {
  const [focusedPersonId, setFocusedPersonId] = useState<string | null>(null);
  const radius = 300;
  const grandRadius = 400;
  const center = { x: 400, y: 400 }; // SVG болон байрлалуудын төв

  const focusTarget =
    focusedPersonId === null
      ? centerPerson
      : children.find((c) => c.id === focusedPersonId) || centerPerson;

  const displayedChildren =
    focusedPersonId === null ? children : grandChildrenMap[focusedPersonId] || [];

  const isRootView = focusedPersonId === null;

  return (
    <div className="relative w-[800px] h-[800px] mx-auto my-10">
      {/* ✅ SVG тойрог болон зурааснууд */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Тойрог (үргэлж үзүүлнэ) */}
        <circle
          cx={center.x}
          cy={center.y}
          r={isRootView ? radius : radius}
          stroke="#bbb"
          strokeWidth="1"
          fill="none"
        />
        {/* Төвөөс хүүхдүүд рүү зураас */}
        {displayedChildren.map((_, index) => {
          const angle = (index / displayedChildren.length) * 2 * Math.PI;
          const r = isRootView ? radius : radius;
          const x = Math.cos(angle) * r + center.x;
          const y = Math.sin(angle) * r + center.y;

          return (
            <line
              key={index}
              x1={center.x}
              y1={center.y}
              x2={x}
              y2={y}
              stroke="#ccc"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* ✅ Төв хүн */}
      <motion.div
        className="absolute text-center z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          left: `${center.x-50}px`,
          top: `${center.y-50}px`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => (isRootView ? null : setFocusedPersonId(null))}
      >
        <img
          src={focusTarget.imageUrl}
          alt={focusTarget.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md cursor-pointer"
        />
        <div className="mt-2 font-semibold">{focusTarget.name}</div>
      </motion.div>

      {/* ✅ Төвийг тойрсон хүүхдүүд */}
      {displayedChildren.map((child, index) => {
        const angle = (index / displayedChildren.length) * 2 * Math.PI;
        const r = isRootView ? radius : radius;
        const x = Math.cos(angle) * r + center.x;
        const y = Math.sin(angle) * r + center.y;

        return (
          <motion.div
            key={child.id}
            className="absolute text-center cursor-pointer z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            style={{
              left: `${x-40}px`,
              top: `${y-40}px`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => {
              if (isRootView) {
                setFocusedPersonId(child.id);
              }
            }}
          >
            <img
              src={child.imageUrl}
              alt={child.name}
              className="w-20 h-20 rounded-full border shadow"
            />
            <div className="text-sm">{child.name}</div>
          </motion.div>
        );
      })}

      {/* ✅ Fade бүдгэрсэн бусад хүүхдүүд */}
      {!isRootView &&
        children
          .filter((c) => c.id !== focusedPersonId)
          .map((c, i) => {
            const angle = (i / children.length) * 2 * Math.PI;
            const x = Math.cos(angle) * grandRadius + center.x;
            const y = Math.sin(angle) * grandRadius + center.y;

            return (
              <motion.div
                key={c.id}
                className="absolute text-center z-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 0.7 }}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="w-16 h-16 rounded-full border border-dashed"
                />
                <div className="text-xs text-gray-500">{c.name}</div>
              </motion.div>
            );
          })}
    </div>
  );
};

export default MultiCircleTree;
