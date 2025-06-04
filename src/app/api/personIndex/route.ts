import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orderedPersons = await prisma.person.findMany({
    orderBy: [
      { generation: 'asc' },
      { parentOrder: 'asc' },
      { orderInFamily: 'asc' },
    ],
    select: { id: true },
  });

  const personIndex = orderedPersons.map(p => p.id);
  return NextResponse.json(personIndex);
}
