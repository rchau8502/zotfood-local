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

  // --- Ingredients ---
  // [name, category, unit, image, tips]
  const ingredients: Array<[string, string, string | null, string | null, string | null]> = [
    ["Eggs", "protein", "piece", null, null],
    ["Rice", "grain", "cup", null, null],
    ["Milk", "dairy", "cup", null, null],
    ["Bread", "grain", "slice", null, null],
    ["Butter", "dairy", "tbsp", null, null],
    ["Salt", "seasoning", "tsp", null, null],
    ["Pepper", "seasoning", "tsp", null, null],
    ["Onion", "vegetable", "piece", null, null],
    ["Garlic", "vegetable", "clove", null, null],
    ["Tomato", "vegetable", "piece", null, null],
    ["Cheese", "dairy", "cup", null, null],
    ["Pasta", "grain", "cup", null, null],
    ["Olive Oil", "fat", "tbsp", null, null],
    ["Chicken", "protein", "lb", null, null],
    ["Potato", "vegetable", "piece", null, null],
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

  // --- Sample Recipes ---
  const recipes = [
    {
      title: "Scrambled Eggs",
      slug: "scrambled-eggs",
      minutes: 5,
      costCents: 150, // $1.50
      servings: 1,
      tools: '["pan", "spatula"]',
      tags: '["breakfast", "quick", "protein"]',
      image: "/sample-images/avocado-toast.jpg",
      steps: [
        { index: 0, text: "Crack 2 eggs into a bowl and whisk with salt and pepper", timerSec: null },
        { index: 1, text: "Heat butter in a pan over medium heat", timerSec: 30 },
        { index: 2, text: "Add eggs and stir constantly until cooked through", timerSec: 120 }
      ],
      ingredients: [
        { name: "Eggs", quantity: 2, unit: "piece" },
        { name: "Butter", quantity: 1, unit: "tbsp" },
        { name: "Salt", quantity: 0.25, unit: "tsp" },
        { name: "Pepper", quantity: 0.125, unit: "tsp" }
      ]
    },
    {
      title: "Garlic Pasta",
      slug: "garlic-pasta",
      minutes: 15,
      costCents: 300, // $3.00
      servings: 2,
      tools: '["pot", "pan", "strainer"]',
      tags: '["dinner", "vegetarian", "italian"]',
      image: "/sample-images/garlic-pasta.jpg",
      steps: [
        { index: 0, text: "Boil water and cook pasta according to package directions", timerSec: 600 },
        { index: 1, text: "Heat olive oil in a pan and sauté minced garlic", timerSec: 60 },
        { index: 2, text: "Add cooked pasta to the pan with garlic oil", timerSec: 30 },
        { index: 3, text: "Toss with cheese and serve hot", timerSec: null }
      ],
      ingredients: [
        { name: "Pasta", quantity: 2, unit: "cup" },
        { name: "Garlic", quantity: 3, unit: "clove" },
        { name: "Olive Oil", quantity: 2, unit: "tbsp" },
        { name: "Cheese", quantity: 0.5, unit: "cup" },
        { name: "Salt", quantity: 0.5, unit: "tsp" }
      ]
    },
    {
      title: "Mug Omelette",
      slug: "mug-omelette",
      minutes: 3,
      costCents: 200, // $2.00
      servings: 1,
      tools: '["microwave", "mug"]',
      tags: '["breakfast", "microwave", "quick"]',
      image: "/sample-images/mug-omelette.jpg",
      steps: [
        { index: 0, text: "Crack 2 eggs into a microwave-safe mug", timerSec: null },
        { index: 1, text: "Add cheese, salt, and pepper, then whisk", timerSec: 30 },
        { index: 2, text: "Microwave for 1 minute, stir, then microwave 30 more seconds", timerSec: 90 }
      ],
      ingredients: [
        { name: "Eggs", quantity: 2, unit: "piece" },
        { name: "Cheese", quantity: 0.25, unit: "cup" },
        { name: "Salt", quantity: 0.125, unit: "tsp" },
        { name: "Pepper", quantity: 0.125, unit: "tsp" }
      ]
    },
    {
      title: "Overnight Oats",
      slug: "overnight-oats",
      minutes: 5,
      costCents: 250, // $2.50
      servings: 1,
      tools: '["jar", "spoon"]',
      tags: '["breakfast", "meal-prep", "healthy"]',
      image: "/sample-images/overnight-oats.jpg",
      steps: [
        { index: 0, text: "Mix oats, milk, and honey in a jar", timerSec: 60 },
        { index: 1, text: "Add toppings and stir gently", timerSec: 30 },
        { index: 2, text: "Refrigerate overnight (8+ hours)", timerSec: null }
      ],
      ingredients: [
        { name: "Rice", quantity: 0.5, unit: "cup" }, // Using rice as oats substitute
        { name: "Milk", quantity: 0.75, unit: "cup" },
        { name: "Tomato", quantity: 0.5, unit: "piece" }, // Using tomato as fruit substitute
        { name: "Cheese", quantity: 0.25, unit: "cup" }
      ]
    }
  ];

  for (const recipeData of recipes) {
    // Create the recipe
    const recipe = await prisma.recipe.upsert({
      where: { slug: recipeData.slug },
      update: {},
      create: {
        title: recipeData.title,
        slug: recipeData.slug,
        minutes: recipeData.minutes,
        costCents: recipeData.costCents,
        servings: recipeData.servings,
        tools: recipeData.tools,
        tags: recipeData.tags,
        image: recipeData.image,
        approved: true,
      },
    });

    // Create recipe steps
    for (const stepData of recipeData.steps) {
      await prisma.step.upsert({
        where: { recipeId_index: { recipeId: recipe.id, index: stepData.index } },
        update: {},
        create: {
          recipeId: recipe.id,
          index: stepData.index,
          text: stepData.text,
          timerSec: stepData.timerSec,
        },
      });
    }

    // Create recipe ingredients
    for (const ingredientData of recipeData.ingredients) {
      const ingredient = await prisma.ingredient.findUnique({
        where: { name: ingredientData.name },
      });
      
      if (ingredient) {
        // Check if the relationship already exists
        const existingRelation = await prisma.recipeIngredient.findFirst({
          where: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
          },
        });

        if (!existingRelation) {
          await prisma.recipeIngredient.create({
            data: {
              recipeId: recipe.id,
              ingredientId: ingredient.id,
              quantity: ingredientData.quantity,
              unit: ingredientData.unit,
            },
          });
        }
      }
    }
  }
  console.log("✓ Recipes upserted");

  // --- Learning Skills and Lessons ---
  const skills = [
    {
      title: "Cooking Fundamentals",
      slug: "cooking-fundamentals",
      order: 1,
      lessons: [
        {
          title: "Knife Safety 101",
          slug: "knife-safety",
          order: 1,
          contentMd: `# Knife Safety 101

## The Foundation of Cooking

Proper knife skills are essential for safe and efficient cooking. This lesson covers the basics of knife safety, grip, and technique.

## The Claw Grip

The most important safety technique is the "claw grip" when holding ingredients:

- **Curve your fingers** under your knuckles
- **Keep fingertips tucked** behind the blade
- **Use your knuckles** as a guide for the blade
- **Never place fingers** directly in the blade's path

## Proper Stance

- Stand with feet shoulder-width apart
- Keep your cutting board stable (use a damp towel underneath)
- Position the board at a comfortable height
- Keep your free hand in the claw position

## Knife Maintenance

- Keep knives sharp - dull knives are more dangerous
- Store knives properly in a block or magnetic strip
- Never put knives in the sink with other dishes
- Hand wash and dry immediately after use

## Practice Makes Perfect

Start with soft ingredients like onions and work your way up to harder items. Always go slow and focus on technique over speed.`,
          quizJson: JSON.stringify({
            questions: [
              { q: "What is the safest way to hold ingredients while cutting?", a: "The claw grip with fingers tucked under knuckles" },
              { q: "Why are dull knives more dangerous than sharp ones?", a: "They require more force and are more likely to slip" },
              { q: "What should you do with knives after washing?", a: "Dry them immediately and store them properly" }
            ]
          })
        },
        {
          title: "Perfect Pasta",
          slug: "perfect-pasta",
          order: 2,
          contentMd: `# Perfect Pasta

## The Art of Pasta Cooking

Pasta seems simple, but there are key techniques that make the difference between good and great pasta.

## Water and Salt

- Use **4-6 quarts of water** per pound of pasta
- Add **2-3 tablespoons of salt** to the water (it should taste like seawater)
- Bring water to a **rolling boil** before adding pasta
- Never add oil to the water - it prevents sauce from sticking

## Timing is Everything

- Start timing when water returns to boil after adding pasta
- Check package directions but taste 1-2 minutes early
- Pasta should be **al dente** - firm to the bite
- Reserve 1 cup of pasta water before draining

## The Al Dente Test

- Take a piece of pasta and bite it
- It should be firm in the center with a white dot
- If completely cooked through, it's overdone
- If too hard, it needs more time

## Finishing Pasta

- Never rinse pasta after draining
- Add pasta directly to sauce in the pan
- Use reserved pasta water to adjust consistency
- Toss pasta with sauce for 1-2 minutes`,
          quizJson: JSON.stringify({
            questions: [
              { q: "How much salt should you add to pasta water?", a: "2-3 tablespoons per 4-6 quarts of water" },
              { q: "What does 'al dente' mean?", a: "Firm to the bite with a slight resistance" },
              { q: "Why should you reserve pasta water before draining?", a: "It helps bind sauce to pasta and adjust consistency" }
            ]
          })
        },
        {
          title: "Sauté Basics",
          slug: "saute-basics",
          order: 3,
          contentMd: `# Sauté Basics

## The Foundation of Flavor

Sautéing is one of the most fundamental cooking techniques. It means "to jump" in French, referring to the tossing motion.

## Heat Control

- **Preheat your pan** before adding oil
- Use **medium-high heat** for most sautéing
- Oil should shimmer but not smoke
- If oil smokes, remove from heat and let cool

## The Right Pan

- Use a **wide, shallow pan** for even heat distribution
- **Stainless steel or cast iron** work best
- Non-stick pans are okay but won't develop fond (browned bits)

## Don't Overcrowd

- Leave space between ingredients
- Cook in batches if necessary
- Overcrowding causes steaming instead of browning
- Each piece should touch the pan surface

## The Tossing Motion

- Use a **flicking motion** with your wrist
- Practice with a pan of rice or beans
- Keep ingredients moving for even cooking
- Use a spatula if you're not comfortable tossing

## Building Flavor

- Start with aromatics (onions, garlic)
- Add ingredients by cooking time (hardest first)
- Season as you go
- Deglaze with liquid to capture fond`,
          quizJson: JSON.stringify({
            questions: [
              { q: "What does 'sauté' mean in French?", a: "To jump, referring to the tossing motion" },
              { q: "Why shouldn't you overcrowd the pan?", a: "It causes steaming instead of browning" },
              { q: "What is 'fond' and why is it important?", a: "Brown bits stuck to the pan that add flavor when deglazed" }
            ]
          })
        }
      ]
    },
    {
      title: "Advanced Techniques",
      slug: "advanced-techniques",
      order: 2,
      lessons: [
        {
          title: "Season Like a Pro",
          slug: "season-like-pro",
          order: 1,
          contentMd: `# Season Like a Pro

## The Art of Seasoning

Proper seasoning can transform any dish from good to extraordinary. It's about balance, timing, and understanding how flavors work together.

## Taste Early, Taste Often

- **Season as you cook**, not just at the end
- Taste at every major step
- Start with less salt - you can always add more
- Remember that flavors concentrate as food cooks

## The Salt Trinity

1. **Kosher salt** for general cooking
2. **Sea salt** for finishing
3. **Table salt** for baking (most consistent)

## Beyond Salt and Pepper

- **Acid** (lemon, vinegar) brightens flavors
- **Sweet** balances heat and salt
- **Umami** (soy sauce, mushrooms) adds depth
- **Heat** (spices, chiles) adds excitement

## Building Layers

- **Base layer**: Salt and pepper
- **Aromatic layer**: Herbs and spices
- **Acid layer**: Citrus or vinegar
- **Finishing layer**: Fresh herbs or finishing salt

## Common Mistakes

- Not tasting as you go
- Adding all seasoning at once
- Forgetting that salt enhances other flavors
- Not considering the salt in other ingredients`,
          quizJson: JSON.stringify({
            questions: [
              { q: "When should you start seasoning food?", a: "As you cook, not just at the end" },
              { q: "What are the four main flavor elements to balance?", a: "Salt, acid, sweet, and umami" },
              { q: "Why is it important to taste frequently while cooking?", a: "Flavors change as food cooks and you need to adjust seasoning" }
            ]
          })
        },
        {
          title: "Mise en Place",
          slug: "mise-en-place",
          order: 2,
          contentMd: `# Mise en Place

## Set Up to Speed Up

Mise en place (pronounced "meez ahn plahs") means "everything in its place." It's the professional chef's secret to efficient cooking.

## What is Mise en Place?

- **Prep all ingredients** before you start cooking
- **Measure everything** out in advance
- **Organize your workspace** logically
- **Have tools ready** and within reach

## The Benefits

- **Faster cooking** - no stopping to prep
- **Less stress** - everything is ready
- **Better results** - no rushing or forgetting ingredients
- **Professional approach** - like working in a restaurant

## How to Set Up

1. **Read the entire recipe** first
2. **Gather all ingredients** and tools
3. **Prep vegetables** (wash, chop, measure)
4. **Measure spices** and seasonings
5. **Set up cooking stations** (stovetop, oven, prep area)
6. **Clean as you go** to maintain organization

## Organization Tips

- Use small bowls for prepped ingredients
- Group ingredients by when they're added
- Keep a trash bowl nearby
- Have a damp towel for wiping hands
- Keep your workspace clean and organized

## Time Management

- Start with longest-cooking items
- Prep while things are cooking
- Use downtime efficiently
- Clean up as you go`,
          quizJson: JSON.stringify({
            questions: [
              { q: "What does 'mise en place' mean?", a: "Everything in its place" },
              { q: "What is the first step in mise en place?", a: "Read the entire recipe first" },
              { q: "Why is mise en place important for home cooks?", a: "It reduces stress and improves cooking results" }
            ]
          })
        },
        {
          title: "Food Safety",
          slug: "food-safety",
          order: 3,
          contentMd: `# Food Safety

## Keep Your Kitchen Safe

Food safety is crucial for preventing foodborne illness. These guidelines will help you cook safely and confidently.

## Temperature Guidelines

### Safe Cooking Temperatures
- **Poultry**: 165°F (74°C)
- **Ground meat**: 160°F (71°C)
- **Beef, pork, lamb**: 145°F (63°C)
- **Fish**: 145°F (63°C)
- **Leftovers**: 165°F (74°C)

### Refrigerator Temperatures
- **Refrigerator**: 40°F (4°C) or below
- **Freezer**: 0°F (-18°C) or below
- **Danger zone**: 40-140°F (4-60°C) - bacteria grow rapidly

## Thawing Safely

1. **Refrigerator**: Safest method, takes time
2. **Cold water**: Change water every 30 minutes
3. **Microwave**: Cook immediately after thawing
4. **Never thaw** at room temperature

## Cross-Contamination Prevention

- **Separate cutting boards** for raw meat and vegetables
- **Wash hands** before and after handling raw meat
- **Clean surfaces** with hot, soapy water
- **Use separate utensils** for raw and cooked food
- **Store raw meat** below other foods in refrigerator

## The 2-Hour Rule

- **Perishable food** should not sit at room temperature for more than 2 hours
- **Hot food** should be kept hot (140°F+)
- **Cold food** should be kept cold (40°F or below)
- **When in doubt, throw it out**

## Hand Washing

- **Wash hands** for at least 20 seconds
- **Use warm water** and soap
- **Wash before** handling food
- **Wash after** handling raw meat, using bathroom, touching face`,
          quizJson: JSON.stringify({
            questions: [
              { q: "What is the safe cooking temperature for poultry?", a: "165°F (74°C)" },
              { q: "What is the 'danger zone' temperature range?", a: "40-140°F (4-60°C) where bacteria grow rapidly" },
              { q: "How long can perishable food sit at room temperature?", a: "No more than 2 hours" }
            ]
          })
        }
      ]
    }
  ];

  for (const skillData of skills) {
    const skill = await prisma.skill.upsert({
      where: { slug: skillData.slug },
      update: {},
      create: {
        title: skillData.title,
        slug: skillData.slug,
        order: skillData.order,
      },
    });

    for (const lessonData of skillData.lessons) {
      await prisma.lesson.upsert({
        where: { skillId_slug: { skillId: skill.id, slug: lessonData.slug } },
        update: {},
        create: {
          skillId: skill.id,
          title: lessonData.title,
          slug: lessonData.slug,
          order: lessonData.order,
          contentMd: lessonData.contentMd,
          quizJson: lessonData.quizJson,
        },
      });
    }
  }
  console.log("✓ Learning content upserted");

  // --- Add sample pantry items for demo user ---
  const demoUser = await prisma.user.findUnique({
    where: { email: demoEmail }
  });

  if (demoUser) {
    const samplePantryItems = [
      { ingredientName: "Eggs", amount: 6 },
      { ingredientName: "Rice", amount: 2 },
      { ingredientName: "Milk", amount: 1 },
      { ingredientName: "Bread", amount: 8 },
      { ingredientName: "Butter", amount: 0.5 },
      { ingredientName: "Onion", amount: 2 },
      { ingredientName: "Garlic", amount: 4 },
      { ingredientName: "Cheese", amount: 1 },
    ];

    for (const item of samplePantryItems) {
      const ingredient = await prisma.ingredient.findUnique({
        where: { name: item.ingredientName }
      });

      if (ingredient) {
        await prisma.pantryItem.upsert({
          where: {
            userId_ingredientId: {
              userId: demoUser.id,
              ingredientId: ingredient.id
            }
          },
          update: {},
          create: {
            userId: demoUser.id,
            ingredientId: ingredient.id,
            amount: item.amount
          }
        });
      }
    }
    console.log("✓ Demo pantry items added");
  }

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
