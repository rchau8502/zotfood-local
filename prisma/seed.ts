for (const [name, category, unit, image, tips] of ingredients) {
  // Skip any ingredient without a valid name
  if (!name || typeof name !== "string" || name.trim() === "") continue;

  // Normalize optionals (Prisma prefers undefined over null)
  const img = image ?? undefined;
  const note = tips ?? undefined;

  await prisma.ingredient.upsert({
    where: { name: name },       // name is now guaranteed a string
    update: {},
    create: {
      name: name,
      category,
      // if your Prisma schema has a specific enum for unit, keep your `as any`
      // or map/cast to the right enum. Also choose a sensible fallback if needed:
      unit: (unit as any) ?? undefined,
      image: img as any,
      tips: note as any,
    },
  });
}
