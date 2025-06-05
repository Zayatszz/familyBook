"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

type Person = {
  id: string;
  name: string;
  imageUrl: string;
};

type RecursiveCircleTreeProps = {
  rootId: string;
  personMap: Record<string, Person>;
  familyMap: Record<string, Person[]>;
};

const RecursiveCircleTree: React.FC<RecursiveCircleTreeProps> = ({
  rootId,
  personMap,
  familyMap,
}) => {
    console.log("rootId: ", rootId);
    console.log("personMap: ", personMap);
    console.log("familyMap: ", familyMap)
  const [focusStack, setFocusStack] = useState<string[]>([rootId]);
  const radius = 200;
  const outerRadius = 300;
  const center = { x: 450, y: 400 };

  const currentFocusedId = focusStack[focusStack.length - 1];
  const centerPerson = personMap[currentFocusedId];
  const children = familyMap[currentFocusedId] || [];

  const handlePersonClick = (id: string) => {
    if (id === currentFocusedId && focusStack.length > 1) {
      setFocusStack((prev) => prev.slice(0, -1));
    } else {
      setFocusStack((prev) => [...prev, id]);
    }
  };


const collectLayers = (
  parentId: string,
  depth = 0,
  result: Person[][] = [],
  visited: Set<string>
): Person[][] => {
  const children = (familyMap[parentId] || []).filter((child) => !visited.has(child.id));
  if (children.length === 0) return result;

  if (!result[depth]) result[depth] = [];
  result[depth].push(...children);
  children.forEach((child) => visited.add(child.id));

  for (const child of children) {
    collectLayers(child.id, depth + 1, result, visited);
  }

  return result;
};



  const visited = new Set<string>([currentFocusedId]); // Төв хүнийг эхлээд бүртгэ
  
const layers = collectLayers(currentFocusedId, 0, [], visited);


  return (
    <div className="relative w-[1000px] h-[1000px] mx-auto my-10">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
           {layers.map((_, layerIndex) => {
                if (layerIndex === 0) return null; // эхний давхарга (children) бол харуулсан байгаа тул алгасана
                const r = outerRadius + 80 * (layerIndex - 1);
                return (
                <circle
                    key={layerIndex}
                    cx={center.x}
                    cy={center.y}
                    r={r}
                    stroke="#ccc"
                    strokeWidth="1"
                    strokeDasharray="5,5" // ➜ тасархай зураас
                    fill="none"
                    />
                    );
                })}


        <circle
          cx={center.x}
          cy={center.y}
          r={radius}
          stroke="#bbb"
          strokeWidth="1"
          fill="none"
        />
        {children.map((_, index) => {
          const angle = (index / children.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius + center.x;
          const y = Math.sin(angle) * radius + center.y;
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

      <motion.div
        className="absolute text-center z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          left: `${center.x - 50}px`,
          top: `${center.y - 50}px`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => handlePersonClick(currentFocusedId)}
      >
        <img
        //   src={centerPerson.imageUrl}
           src={"/bgBook.jpg"}
          alt={centerPerson.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md cursor-pointer"
        />
        <div className="mt-2 font-semibold">{centerPerson.firstName}</div>
      </motion.div>

      {children.map((child, index) => {
        const angle = (index / children.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius + center.x;
        const y = Math.sin(angle) * radius + center.y;

        return (
          <motion.div
            key={child.id}
            className="absolute text-center cursor-pointer z-10"
            initial={{ x: center.x, y: center.y, opacity: 0, scale: 0.3 }}
            animate={{ x: x - 40, y: y - 40, opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 4, type: "spring", stiffness: 100 }}
            style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
            onClick={() => handlePersonClick(child.id)}
          >
            <img
            //   src={child.imageUrl}
               src={"/bgBook.jpg"}
              alt={child.firstName}
              className="w-20 h-20 rounded-full border shadow"
            />
            <div className="text-sm">{child.firstName}</div>
          </motion.div>
        );
      })}

    
 {layers.map((layerData, layerIndex) => {
      if (layerIndex === 0) return null;
        const radiusByLayer = outerRadius+80*(layerIndex-1);
        return layerData.map((p, i) => {
          const angle = (i / layerData.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radiusByLayer + center.x-25;
          const y = Math.sin(angle) * radiusByLayer + center.y-25;

          return (
            <motion.div
              key={p.id}
              className="absolute text-center z-0 opacity-30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 0.7 }}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                // src={p.imageUrl}
                src={"/bgBook.jpg"}
                alt={p.firstName}
                className="w-16 h-16 rounded-full border border-dashed"
              />
              <div className="text-xs text-gray-500">{p.firstName}</div>
            </motion.div>
          );
        });
      })}
    </div>
  );
};

export default RecursiveCircleTree;
