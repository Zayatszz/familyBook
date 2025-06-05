// src/app/admin/media/[personId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import toast from "react-hot-toast";
export default function MediaUploadPage() {
  const { personId } = useParams();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const [nameFile, setNameFile] = useState<File | null>(null);
  const [nameUrl, setNameUrl] = useState<string | null>(null);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);
  const [audioRemoved, setAudioRemoved] = useState(false);
  const [nameRemoved, setNameRemoved] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  const [lastName, setLastName] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);


  useEffect(() => {
    fetch(`/api/uploaded?personId=${personId}`)
      .then((res) => res.json())
      .then((data) => {
        setUploadedUrls(data.urls || []);
        if (data.audioUrl) setAudioUrl(data.audioUrl);
        if (data.nameUrl) setNameUrl(data.nameUrl);
        if (data.imageUrl) setImageUrl(data.imageUrl);
        if (data.lastName) setLastName(data.lastName);
        if (data.firstName) setFirstName(data.firstName);

      })
      .catch(() => setUploadedUrls([]));
  }, [personId]);

  const handleUpload = async () => {

    setIsUploading(true);
    console.log("Hadgalah darsan imnida", isUploading)
    // Устгах файлуудыг сервер рүү явуулах
    for (const url of removedUrls) {
      await fetch(`/api/upload?personId=${personId}&url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
    }
    console.log("audioRemoved?:", audioRemoved)
    console.log("audioUrl: " + audioUrl)
    if (audioRemoved && audioUrl) {
      await fetch(`/api/upload?personId=${personId}&url=${encodeURIComponent(audioUrl)}&isAudio=true`, {
        method: "DELETE",
      });
      setAudioUrl(null);
    }

    if (nameRemoved && nameUrl) {
      await fetch(`/api/upload?personId=${personId}&url=${encodeURIComponent(nameUrl)}&isNameImage=true`, {
        method: "DELETE",
      });
      setNameUrl(null);
    }

    if (imageRemoved && imageUrl) {
      await fetch(`/api/upload?personId=${personId}&url=${encodeURIComponent(imageUrl)}&isImage=true`, {
        method: "DELETE",
      });
      setImageUrl(null);
    }


    // Шинэ файлуудыг upload хийх
    if ((files && files.length > 0) || audioFile || nameFile || imageFile) {
      const formData = new FormData();
      if (files) Array.from(files).forEach((file) => formData.append("files", file));
      if (audioFile) formData.append("audio", audioFile);
      if (nameFile) formData.append("nameImage", nameFile);
      if (imageFile) formData.append("image", imageFile);


      try {
        const res = await fetch(`/api/upload?personId=${personId}`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          toast.success("Амжилттай хадгалагдлаа ✅");
        }
        const data = await res.json();
        if (data.urls) setUploadedUrls((prev) => [...prev, ...data.urls]);
        if (data.audioUrl) setAudioUrl(data.audioUrl);
        if (data.nameUrl) setNameUrl(data.nameUrl);
        if (data.imageUrl) setImageUrl(data.imageUrl);

        setFiles(null);
        setAudioFile(null);
        setNameFile(null);
        setImageFile(null);
      } catch (error) {
        toast.error("Хадгалах үед алдаа гарлаа ❌");
        console.error("Upload error:", error);
      }
    }

    setRemovedUrls([]);
    setAudioRemoved(false);
    setIsUploading(false);

  };

  const removeUploaded = (url: string) => {
    setRemovedUrls((prev) => [...prev, url]);
    setUploadedUrls((prev) => prev.filter((u) => u !== url));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-700">
        {lastName} {firstName}-ийн зураг/видео нэмэх
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
                  className="relative w-full aspect-square rounded border border-blue-500 overflow-hidden group"
                >
                  <button
                    onClick={() => removeUploaded(url)}
                    className="absolute top-1 right-1 z-10 hidden group-hover:block bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
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
        {/* 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
         
        </div> */}

        <div className="space-y-2 mt-8">
          <h3 className="text-lg font-semibold">Аудио файл</h3>
          {audioUrl && !audioRemoved ? (
            <div className="relative">

              <audio controls src={audioUrl} className="w-full rounded border border-blue-400" />
              <button
                onClick={() => {
                  setAudioRemoved(true);
                  // setAudioUrl(null);
                }}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Аудио файл байхгүй байна</p>
          )}

          <Label htmlFor="audio-upload">Аудио файл нэмэх</Label>
          {/* <Input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAudioFile(file);
              setAudioRemoved(false);
            }}
            className="mt-2"
          /> */}
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAudioFile(file);
              if (audioUrl) {
                setAudioRemoved(true); // Хуучин аудио устгах
                // setAudioUrl(null);     // UI-гаас арилгах
              }
            }}
            className="mt-2"
          />

        </div>

        <div className="space-y-2 mt-8">
          <h3 className="text-lg font-semibold">Монгол бичгээр бичсэн нэрний зураг</h3>
          {nameUrl && !nameRemoved ? (
            <div className="relative">
              <img
                height={100}
                width={100}
                src={nameUrl}
                alt="Монгол бичгээр нэр"
                className=" rounded border border-blue-400 object-contain"
              />
              <button
                onClick={() => {
                  setNameRemoved(true);
                }}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Монгол бичгийн зураг байхгүй байна</p>
          )}
          <Label htmlFor="name-upload">Монгол бичиг нэр зураг оруулах</Label>
          <Input
            id="name-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setNameFile(file);
              if (nameUrl) {
                setNameRemoved(true);
              }
            }}
            className="mt-2"
          />

        </div>

        {/* ------------------ Өөрийн зураг оруулах ------------------ */}
        <div className="space-y-2 mt-8">
          <h3 className="text-lg font-semibold">Та өөрийн зургаа оруулна уу</h3>
          {imageUrl && !imageRemoved ? (
            <div className="relative w-40 aspect-square rounded border border-blue-400 overflow-hidden">
              <img
                src={imageUrl}
                alt="Өөрийн зураг"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setImageRemoved(true)}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500"></p>
          )}
          <Label htmlFor="image-upload">Зураг сонгох</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
              if (imageUrl) {
                setImageRemoved(true);
              }
            }}
            className="mt-2"
          />
        </div>

      </div>

      <Button onClick={handleUpload} disabled={isUploading} className="bg-pink-700 text-white px-8 py-6">
        {isUploading ? "Файл байршуулагдаж байна. Түр хүлээнэ үү..." : "Хадгалах"}
      </Button>
    </div>
  );
}

