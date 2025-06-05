// src/app/api/persons/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET /api/persons/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // энэ хэлбэрийг ашиглана
) {
  const id = params.id; // энэ үед задаргаа нь синхрон байж болно

  const person = await prisma.person.findUnique({
    where: { id },
  });

  if (!person) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(person);
}



// PUT /api/persons/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedPerson = await prisma.person.update({
      where: { id: params.id },
      data: {
        lastName: body.lastName,
        firstName: body.firstName,
        nickname: body.nickname,
        gender: body.gender,
        birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
        deathDate: body.deathDate ? new Date(body.deathDate) : undefined,
        description: body.description,
        audioUrl: body.audioUrl || null,
        orderInFamily: body.orderInFamily ? parseInt(body.orderInFamily) : null,
        generation: body.familyPosition ? parseInt(body.familyPosition) : null,
      },
    });

    return NextResponse.json(updatedPerson);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update person" }, { status: 500 });
  }
}

// DELETE /api/persons/[id]
// DELETE /api/persons/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  let mediaUrls: string[] = [];
  let audioUrl: string | null = null;

  try {
    const body = await req.json();
    mediaUrls = body.mediaUrls || [];
    audioUrl = body.audioUrl || null;
  } catch (err) {
    // body ирээгүй тохиолдолд хоосон гэж үзнэ
  }

  try {
    console.log("check this")


    const deleteFromCloudinary = async (url: string, type: "image" | "video") => {
      const parts = url.split("/");
      const publicIdWithExt = parts[parts.length - 1];
      const publicId = `urgiin_nom/${publicIdWithExt.split(".")[0]}`;
        console.log("Cloudinary устгаж байна:", publicId, type);
      await cloudinary.uploader.destroy(publicId, { resource_type: type });
    };

    for (const url of mediaUrls) {
      const type = url.includes(".mp4") ? "video" : "image";
      await deleteFromCloudinary(url, type);
    }

    if (audioUrl) {
      await deleteFromCloudinary(audioUrl, "video");
    }

    await prisma.personRelation.deleteMany({
      where: {
        OR: [{ parentId: id }, { childId: id }],
      },
    });
    await prisma.media.deleteMany({ where: { personId: id } });
    await prisma.person.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Устгах үед алдаа гарлаа" }, { status: 500 });
  }
}
