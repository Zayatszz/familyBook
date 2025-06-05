import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function streamUpload(buffer: Buffer, type: "image" | "video") {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "urgiin_nom",
        resource_type: type,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

export async function POST(req: NextRequest) {
  const personId = req.nextUrl.searchParams.get("personId");
  if (!personId) return NextResponse.json({ error: "No personId" }, { status: 400 });

  const formData = await req.formData();
  const uploadResults: string[] = [];
  let audioUrl: string | null = null;

  // Handle images/videos
  const fileFields = formData.getAll("files") as File[];
  for (const file of fileFields) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const type = file.type.includes("video") ? "video" : "image";
    const url = await streamUpload(buffer, type);
    uploadResults.push(url);

    await prisma.media.create({
      data: {
        personId,
        url,
        type,
      },
    });
  }

  // Handle audio
  const audio = formData.get("audio") as File | null;
  if (audio) {
    const audioBuffer = Buffer.from(await audio.arrayBuffer());
    audioUrl = await streamUpload(audioBuffer, "video"); // treat audio as video

    await prisma.person.update({
      where: { id: personId },
      data: { audioUrl },
    });
  }

  // Handle nameUrl
  const nameImage = formData.get("nameImage") as File | null;
let nameUrl: string | null = null;

if (nameImage) {
  const buffer = Buffer.from(await nameImage.arrayBuffer());
  nameUrl = await streamUpload(buffer, "image");
  await prisma.person.update({
    where: { id: personId },
    data: { nameUrl }, // DB-д хадгалах
  });
}

// Handle personal image (imageUrl)
const personalImage = formData.get("image") as File | null;
let imageUrl: string | null = null;

if (personalImage) {
  const buffer = Buffer.from(await personalImage.arrayBuffer());
  imageUrl = await streamUpload(buffer, "image");
  await prisma.person.update({
    where: { id: personId },
    data: { imageUrl }, // DB талд хадгална
  });
}


  return NextResponse.json({ urls: uploadResults, audioUrl, nameUrl, imageUrl });


}

export async function DELETE(req: NextRequest) {
  const personId = req.nextUrl.searchParams.get("personId");
  const url = req.nextUrl.searchParams.get("url");
  const isAudio = req.nextUrl.searchParams.get("isAudio");
  const isNameImage = req.nextUrl.searchParams.get("isNameImage");
  const isImage = req.nextUrl.searchParams.get("isImage");
  
  if (!personId || !url) {
    return NextResponse.json({ error: "personId болон url шаардлагатай" }, { status: 400 });
  }

  // Cloudinary public_id гаргаж авах (url доторх ID хэсэг)
  const parts = url.split("/");
  const publicIdWithExt = parts[parts.length - 1];
  const publicId = `urgiin_nom/${publicIdWithExt.split(".")[0]}`;

  try {
    // Cloudinary-аас устгах
    console.log("publicId: ", publicId)
    console.log("isAudio: ", isAudio)
    await cloudinary.uploader.destroy(publicId, {
      resource_type: isAudio ? "video" : "image",
    });

    // DB-оос устгах
    if (isAudio) {
      await prisma.person.update({
        where: { id: personId },
        data: { audioUrl: null },
      });
    } else if (isNameImage) {
    await prisma.person.update({
      where: { id: personId },
      data: { nameUrl: null },
    });
  }else if (isImage) {
    await prisma.person.update({
      where: { id: personId },
      data: { imageUrl: null },
    });
  } else {
      await prisma.media.deleteMany({
        where: { personId, url },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Устгах үед алдаа гарлаа" }, { status: 500 });
  }
}


function getPublicIdFromUrl(url: string): string {
  const parts = url.split("/");
  const fileWithExt = parts[parts.length - 1];
  const publicId = fileWithExt.split(".")[0]; // remove .jpg/.mp4/etc
  return `urgiin_nom/${publicId}`;
}
