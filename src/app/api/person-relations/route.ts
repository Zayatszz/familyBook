import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { parentId, childId } = await req.json();

    if (!parentId || !childId) {
      return NextResponse.json(
        { error: "parentId болон childId шаардлагатай." },
        { status: 400 }
      );
    }

    const newRelation = await prisma.personRelation.create({
      data: {
        parent: { connect: { id: parentId } },
        child: { connect: { id: childId } },
      },
    });

    return NextResponse.json(newRelation, { status: 201 });
  } catch (error) {
    console.error("Харилцаа үүсгэх үед алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа." },
      { status: 500 }
    );
  }
}
