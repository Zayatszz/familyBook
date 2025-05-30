'use client';

import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Book from '../components/Book';
import '../styles/app.css'
// const pages = [
//    {
//     type: 'cover',
//     content: (
//       <div className=" items-center justify-center gap-4 p-4">
//         <img src="/nomads.png" alt="Nomads" className="w h-auto rounded"/>
//         {/* <span className="text-black text-3xl font-bold">Front 1</span> */}
//         <div className="flex flex-row items-center justify-center gap-4 p-4">
//           Нүүр хуудас
//         </div>
//       </div>
//     ),
//   },
//   // {
//   //   type: 'cover',
//   //   content: <span className="text-black text-3xl font-bold">Front 1</span>,
//   // },
//   {
//     content: <span className="text-black text-xl font-bold">Page 1</span>,
//   },
//   {
//     content: <span className="text-black text-xl font-bold">Page 2</span>,
//   },
//   {
//     content: <span className="text-black text-xl font-bold">Page 3</span>,
//   },
//   {
//     type: 'back',
//     content: <span className="text-black text-xl font-bold">Page 4</span>,
//   },
// ];


export default function Home() {

  return (
    <div className="container ">
        <Book />
    </div>
  );


//   const flipBookRef = useRef(null);
//   const [singlePageMode, setSinglePageMode] = useState(true);

//   const onFlip = (e) => {
//     const page = e.data;

//     // once we flip from front page, switch to full book mode
//     if (singlePageMode && page > 0) {
//       setSinglePageMode(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-black px-4">
//       {singlePageMode ? (
//   <div className="w-[800px] h-[800px] bg-white border border-gray-300 flex items-center justify-center shadow-xl mt-10 rounded">
//     {pages[0].content}
//     <button onClick={() => setSinglePageMode(false)} className="absolute bottom-10 bg-black text-white px-4 py-2 rounded">Ном эхлүүлэх</button>
//   </div>
// ) : (
//   <HTMLFlipBook
//     ref={flipBookRef}
//     width={800}
//     height={800}
//     showCover={true}
//     onFlip={onFlip}
//     className="shadow-xl mt-10 rounded overflow-hidden"
//   >
//     {pages.map((p, i) => (
//       <div
//         key={i}
//         className="flex items-center justify-center w-full h-full bg-white border border-gray-300"
//       >
//         {p.content}
//       </div>
//     ))}
//   </HTMLFlipBook>
// )}

//     </div>
//   );
}


        //  ${singlePageMode && i === 0 ? 'single-center-page' : ''}