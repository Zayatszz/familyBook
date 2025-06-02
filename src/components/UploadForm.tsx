"use client";

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
      {url && (
        <div>
          <p>Uploaded:</p>
          {url.endsWith('.mp4') ? (
            <video src={url} controls width="300" />
          ) : (
            <img src={url} alt="Uploaded" width="300" />
          )}
        </div>
      )}
    </div>
  );
}
