// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding…");

  // --- Demo user ---
  const demoEmail = "demo@uci.edu";
  const demoPass = "password123";
  const passwordHash = await bcrypt.hash(demoPass, 10);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      password: passwordHash,
      displayName: "Demo User",
    },
  });
  console.log("✓ Demo user upserted");

  // --- Minimal ingredients (inline array so we can't 'forget' to import it) ---
  // [name, category, unit, image, tips]
  const ingredients: Array<[string, string, string | null, string | null, string | null]> = [
    ["Eggs", "protein", "piece", null, null],
    ["Rice", "grain", "cup", null, null],
    ["Milk", "dairy", "cup", null, null],
  ];

  for (const [name, category, unit, image, tips] of ingredients) {
    if (!name || typeof name !== "string" || name.trim() === "") continue;

    await prisma.ingredient.upsert({
      where: { name },
      update: {},
      create: {
        name,
        category,
        // Prisma prefers undefined over null for optional fields
        unit: (unit ?? undefined) as any,
        image: (image ?? undefined) as any,
        tips: (tips ?? undefined) as any,
      },
    });
  }
  console.log("✓ Ingredients upserted");

  console.log("Seeding complete.");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:");
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
