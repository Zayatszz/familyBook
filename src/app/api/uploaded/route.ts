
// src/app/api/uploaded/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const personId = req.nextUrl.searchParams.get("personId");
  if (!personId) return NextResponse.json({ error: "No personId" }, { status: 400 });

  const media = await prisma.media.findMany({
    where: { personId },
    orderBy: { id: "asc" },
  });

  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { audioUrl: true, nameUrl: true },
  });

  return NextResponse.json({
    urls: media.map((m) => m.url),
    audioUrl: person?.audioUrl || null,
    nameUrl: person?.nameUrl || null,
  });
}
