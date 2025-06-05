// /api/person-relations/by-child/[childId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(  req: NextRequest, { params }: { params: { childId: string } }) {
  const { childId } = params;

  try {
    const relation = await prisma.personRelation.findFirst({
      where: { childId },
    });
console.log("childId from api: ", childId)
    console.log("relation from api: ", relation)
    return NextResponse.json(relation ?? {});
  } catch (error) {
    console.error("Error fetching relation", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
