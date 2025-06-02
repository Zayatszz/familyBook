'use client';

import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Book from '../components/Book';
import '../styles/app.css'
import UploadForm from '@/components/UploadForm';

export default function Test() {

  return (
    <div className="container ">
        <UploadForm/>
    </div>
  );


}

