// src/app/admin/media/[personId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function MediaUploadPage() {
  const { personId } = useParams();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const [searchForm, setSearchForm] = useState({
    lastName: "",
    firstName: "",
    orderInFamily: "",
    familyPosition: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`/api/upload?personId=${personId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadedUrls(data.urls);
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
      <h2 className="text-xl font-bold text-pink-700">
         Та тухайн хүний мэдээллийг оруулан зураг/видео-уудыг үзнэ үү.
      </h2>

      <div className="bg-white  p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          <div>
            <Label htmlFor="lastName">Овог</Label>
            <Input name="lastName" value={searchForm.lastName} onChange={handleSearchChange} />
          </div>
          <div>
            <Label htmlFor="firstName">Нэр</Label>
            <Input name="firstName" value={searchForm.firstName} onChange={handleSearchChange} />
          </div>
          <div>
            <Label htmlFor="orderInFamily">Айлын хэддэх хүүхэд</Label>
            <Input name="orderInFamily" value={searchForm.orderInFamily} onChange={handleSearchChange} />
          </div>
          <div>
            <Label htmlFor="familyPosition">Хэддэх үе</Label>
            <Input name="familyPosition" value={searchForm.familyPosition} onChange={handleSearchChange} />
          </div>
          
           <Button className="bg-pink-700 text-white text-sm px-6 py-2 mt-3">Хайх</Button>
        </div>
       
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {files && Array.from(files).map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/5] rounded border border-gray-300 overflow-hidden group"
                >
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 z-10 hidden group-hover:block bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white"
                  >
                    <X size={14} />
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

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {uploadedUrls.map((url, idx) => (
              <div
                key={idx}
                className="w-full aspect-[4/5] rounded border border-blue-500 overflow-hidden"
              >
                {url.endsWith(".mp4") ? (
                  <video src={url} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={url} alt="uploaded" className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

  
      </div>
    </div>
  );
}
