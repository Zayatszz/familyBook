// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const uvuu = await prisma.person.create({
    data: {
      lastName:"Өндөр өвөө",
      firstName: "Өндөр өвөө",
      description: "Удмын эхлэл болсон өвөг дээдэс.",
      generation: 1,
    }
  });

  const huu = await prisma.person.create({
    data: {
      lastName:"Өндөр өвөө",
      firstName: "Өндөр өвөө",
      description: "Өвөөгийн хүү",
      generation: 2,
    }
  });

  await prisma.personRelation.create({
    data: {
      parentId: uvuu.id,
      childId: huu.id,
    }
  });

  await prisma.media.create({
    data: {
      personId: uvuu.id,
      type: "image",
      url: "/images/uvuu.jpg",
    }
  });

  console.log("✅ Seed хийж дууслаа");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
