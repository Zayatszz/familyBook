import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma client-ээ эндээс импортолсон гэж үзье

export async function POST(req: NextRequest) {
  const body = await req.json();

  const person = await prisma.person.create({
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
      parentOrder:body.parentOrder? parseInt(body.parentOrder) : null
    },
  });

  return NextResponse.json(person, { status: 201 });
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const generation = searchParams.get("generation");

  try {
    const people = await prisma.person.findMany({
      where: generation
        ? { generation: Number(generation) }
        : {},
        include: {
        parentRelations: true, // 🔥 parentRelation-уудыг хамт ачаална
      },
      orderBy: { firstName: "asc" },
    });

    return NextResponse.json(people);
  } catch (error) {
    console.error("Алдаа:", error);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}