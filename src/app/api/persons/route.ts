import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma client-ээ эндээс импортолсон гэж үзье

export async function POST(req: NextRequest) {
  const body = await req.json();

  const person = await prisma.person.create({
    data: {
      lastName: body.lastName,
      firstName: body.firstName,
      gender: body.gender,
      birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
      deathDate: body.deathDate ? new Date(body.deathDate) : undefined,
      description: body.description,
      audioUrl: body.audioUrl || null,
      orderInFamily: body.orderInFamily ? parseInt(body.orderInFamily) : null,
      generation: body.familyPosition ? parseInt(body.familyPosition) : null,
    },
  });

  return NextResponse.json(person, { status: 201 });
}

export async function GET() {
  const persons = await prisma.person.findMany();
  return NextResponse.json(persons);
}
