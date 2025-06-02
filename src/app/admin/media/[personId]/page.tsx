// src/app/admin/media/[personId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function MediaUploadPage() {
  const { personId } = useParams();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    // Mocked fetch of previously uploaded URLs
    fetch(`/api/uploaded?personId=${personId}`)
      .then((res) => res.json())
      .then((data) => {
        setUploadedUrls(data.urls || []);
        if (data.audioUrl) setAudioUrl(data.audioUrl);
      })
      .catch(() => setUploadedUrls([]));
  }, [personId]);

  const handleUpload = async () => {
    if ((!files || files.length === 0) && !audioFile) return;

    setIsUploading(true);
    const formData = new FormData();
    if (files) Array.from(files).forEach((file) => formData.append("files", file));
    if (audioFile) formData.append("audio", audioFile);

    try {
      const res = await fetch(`/api/upload?personId=${personId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.urls) setUploadedUrls((prev) => [...prev, ...data.urls]);
      if (data.audioUrl) setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (indexToRemove: number) => {
    if (!files) return;
    const dataTransfer = new DataTransfer();
    Array.from(files).forEach((file, idx) => {
      if (idx !== indexToRemove) dataTransfer.items.add(file);
    });
    setFiles(dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700">
        {personId}-ийн зураг/видео нэмэх
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Өмнөх файлууд</h3>
          {uploadedUrls.length === 0 ? (
            <p className="text-gray-500 text-sm">Хоосон байна</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {uploadedUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-square rounded border border-blue-500 overflow-hidden"
                >
                  {url.endsWith(".mp4") ? (
                    <video src={url} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={url} alt="uploaded" className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold">Шинэ файлууд</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-4">
          {files && Array.from(files).map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="relative w-full aspect-square rounded border border-gray-300 overflow-hidden group"
              >
                <button
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 z-10 hidden group-hover:block bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
                >
                  <X size={16} />
                </button>
                {file.type.includes("video") ? (
                  <video src={url} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={url} alt="preview" className="w-full h-full object-cover" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
          <label className="border border-blue-500 text-blue-600 font-medium flex items-center justify-center aspect-square cursor-pointer rounded">
            Зураг, бичлэг оруулах
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => {
                const newFiles = e.target.files;
                if (!newFiles) return;
                setFiles((prev) => {
                  if (!prev) return newFiles;
                  const dataTransfer = new DataTransfer();
                  Array.from(prev).forEach((f) => dataTransfer.items.add(f));
                  Array.from(newFiles).forEach((f) => dataTransfer.items.add(f));
                  return dataTransfer.files;
                });
              }}
              hidden
            />
          </label>
        </div>

        <div className="space-y-2 mt-8">
          <h3 className="text-lg font-semibold">Аудио файл</h3>
          {audioUrl ? (
            <audio controls src={audioUrl} className="w-full rounded border border-blue-400" />
          ) : (
            <p className="text-sm text-gray-500">Аудио файл байхгүй байна</p>
          )}

          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAudioFile(file);
            }}
            className="mt-2"
          />
        </div>
      </div>

      <Button onClick={handleUpload} disabled={isUploading} className="bg-pink-700 text-white px-8 py-6">
        {isUploading ? "Түр хүлээнэ үү..." : "Хадгалах"}
      </Button>
    </div>
  );
}
