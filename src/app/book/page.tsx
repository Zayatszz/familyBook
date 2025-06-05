"use client"
import CircleTree from "@/components/CircleTree";
import Book from "@/components/book/Book";
import { useState } from "react";
import MultiCircleTree from "@/components/MultiCircleTree";
import '../../styles/app.css'
import BookWithTree from "@/components/book/BookWithTree";
export default function HomePage() {

  return (
 
         <div className="container ">
            <BookWithTree/>
        {/* <Book /> */}
    </div>
 
  )
}
