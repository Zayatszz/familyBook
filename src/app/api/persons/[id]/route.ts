// src/app/api/persons/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/persons/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const person = await prisma.person.findUnique({
      where: { id: params.id },
    });

    if (!person) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch person" }, { status: 500 });
  }
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
