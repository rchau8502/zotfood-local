{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // prisma/seed.mjs\
import \{ PrismaClient \} from "@prisma/client";\
import bcrypt from "bcryptjs";\
\
const prisma = new PrismaClient();\
\
const INGREDIENTS = [\
  ["banana","fruit"],["apple","fruit"],["avocado","fruit"],\
  ["onion","vegetable"],["tomato","vegetable"],["garlic","vegetable"],\
  ["rice","grain"],["pasta","grain"],\
  ["chicken breast","protein"],["tofu","protein"],["egg","protein"],\
  ["spinach","vegetable"],["bell pepper","vegetable"],["carrot","vegetable"],\
  ["potato","vegetable"],["broccoli","vegetable"],["mushroom","vegetable"],\
  ["oats","grain"],["milk","dairy"],["yogurt","dairy"],\
  ["cheddar","dairy"],["tortilla","grain"],["canned beans","protein"],\
  ["canned tuna","protein"],["soy sauce","other"]\
];\
\
const RECIPES = [\
  \{ title:"Microwave Mug Omelette", slug:"microwave-mug-omelette",\
    minutes:2, costCents:150, servings:1, tools:["Microwave","Mug"],\
    tags:["Quick","Breakfast","\uc0\u8804 5 ingredients","Budget"],\
    steps:[\
      \{ index:1, text:"Crack eggs into a mug, whisk with milk and pinch of salt.", timerSec:null \},\
      \{ index:2, text:"Microwave until set, stirring once halfway.", timerSec:60 \}\
    ],\
    ingredients:[\
      ["egg", 2, "count", "Can use egg whites"],\
      ["milk", 0.25, "cup", "Can use almond milk"],\
      ["cheddar", 0.05, "lb", "Optional"]\
    ]\
  \},\
  \{ title:"Avocado Toast", slug:"avocado-toast",\
    minutes:5, costCents:200, servings:1, tools:["Toaster"],\
    tags:["Vegetarian","Quick","\uc0\u8804 5 ingredients","Budget"],\
    steps:[\
      \{ index:1, text:"Toast bread. Mash avocado with salt.", timerSec:null \},\
      \{ index:2, text:"Spread avocado on toast and serve.", timerSec:null \}\
    ],\
    ingredients:[\
      ["avocado", 1, "count", ""],\
      ["tortilla", 1, "count", "You can use bread instead"]\
    ]\
  \},\
  \{ title:"Garlic Butter Pasta", slug:"garlic-butter-pasta",\
    minutes:12, costCents:180, servings:2, tools:["Pot","Stove"],\
    tags:["Vegetarian","Quick","Budget"],\
    steps:[\
      \{ index:1, text:"Boil pasta until al dente.", timerSec:600 \},\
      \{ index:2, text:"Saut\'e9 garlic in butter; toss pasta.", timerSec:null \}\
    ],\
    ingredients:[\
      ["pasta", 0.25, "lb", ""],\
      ["garlic", 2, "cloves", ""],\
      ["cheddar", 0.05, "lb", "Optional"]\
    ]\
  \},\
  \{ title:"Air Fryer Tofu Bites", slug:"air-fryer-tofu-bites",\
    minutes:15, costCents:250, servings:2, tools:["Air Fryer"],\
    tags:["Vegan","Quick","Budget"],\
    steps:[\
      \{ index:1, text:"Cube tofu and toss with soy sauce.", timerSec:null \},\
      \{ index:2, text:"Air fry until crispy.", timerSec:600 \}\
    ],\
    ingredients:[\
      ["tofu", 0.5, "lb", ""],\
      ["soy sauce", 1, "tbsp", ""]\
    ]\
  \}\
];\
\
async function main() \{\
  const demo = await prisma.user.upsert(\{\
    where: \{ email: "demo@uci.edu" \},\
    update: \{\},\
    create: \{\
      email: "demo@uci.edu",\
      password: bcrypt.hashSync("password123", 10),\
      displayName: "Peter Anteater"\
    \}\
  \});\
\
  const ingredientMap = \{\};\
  for (const [name, category] of INGREDIENTS) \{\
    const ing = await prisma.ingredient.upsert(\{\
      where: \{ name \},\
      update: \{\},\
      create: \{ name, category, tips: "Store in fridge for 3-5 days" \}\
    \});\
    ingredientMap[name] = ing.id;\
  \}\
\
  const skills = [\
    \{ title: "Knife Basics", slug: "knife-basics", lessons: [\
      ["Holding a Knife Safely","holding-a-knife-safely","Which grip is safest?"],\
      ["Dicing an Onion","dicing-an-onion","Which cut is dice?"],\
      ["Julienne Cuts","julienne-cuts","What is julienne?"],\
      ["Mincing Garlic","mincing-garlic","What indicates a proper mince?"]\
    ]\},\
    \{ title: "Eggs 101", slug: "eggs-101", lessons: [\
      ["Scrambled","scrambled","When to stop cooking?"],\
      ["Fried","fried","Which heat level is best?"],\
      ["Poached","poached","What does vinegar help?"],\
      ["Omelette","omelette","When to fold?"]\
    ]\},\
    \{ title: "Stir-Fry Starter", slug: "stir-fry-starter", lessons: [\
      ["Prep","prep","Why slice thin?"],\
      ["High Heat Technique","high-heat","What temp is right?"],\
      ["Sauce Basics","sauce-basics","Which thickener helps?"],\
      ["Protein + Veg Combos","protein-veg","Balance what elements?"]\
    ]\}\
  ];\
\
  for (const s of skills) \{\
    const skill = await prisma.skill.upsert(\{\
      where: \{ slug: s.slug \},\
      update: \{ title: s.title \},\
      create: \{ title: s.title, slug: s.slug, order: 1 \}\
    \});\
    let order = 1;\
    for (const [title, slug, q] of s.lessons) \{\
      await prisma.lesson.upsert(\{\
        where: \{ skillId_slug: \{ skillId: skill.id, slug \} \},\
        update: \{\},\
        create: \{\
          skillId: skill.id, title, slug, order: order++,\
          contentMd: `# $\{title\}\\nBasics for $\{title\}.`,\
          quizJson: JSON.stringify(\{\
            questions: [\{ q, options: ["Low","Medium","High","Off"], correct: 2 \}]\
          \})\
        \}\
      \});\
    \}\
  \}\
\
  const achievements = [\
    ["FIRST_CHOP", "Complete your first Knife Basics lesson", "First knife lesson"],\
    ["BREAKFAST_BOSS", "Cook 5 breakfast recipes", "5 breakfast recipes"],\
    ["BUDGET_BENDER", "Cook 10 recipes under $2", "10 budget recipes"]\
  ];\
  for (const [code, name, desc] of achievements) \{\
    await prisma.achievement.upsert(\{\
      where: \{ code \},\
      update: \{ name, desc \},\
      create: \{ code, name, desc \}\
    \});\
  \}\
\
  for (const r of RECIPES) \{\
    const recipe = await prisma.recipe.upsert(\{\
      where: \{ slug: r.slug \},\
      update: \{\},\
      create: \{\
        title: r.title, slug: r.slug, minutes: r.minutes, costCents: r.costCents,\
        servings: r.servings, tools: JSON.stringify(r.tools), tags: JSON.stringify(r.tags),\
        approved: true, createdById: demo.id\
      \}\
    \});\
    for (const s of r.steps) \{\
      await prisma.step.upsert(\{\
        where: \{ recipeId_index: \{ recipeId: recipe.id, index: s.index \} \},\
        update: \{ text: s.text, timerSec: s.timerSec ?? null \},\
        create: \{ recipeId: recipe.id, index: s.index, text: s.text, timerSec: s.timerSec ?? null \}\
      \});\
    \}\
    for (const [name, qty, unit, notes] of r.ingredients) \{\
      const ingId = ingredientMap[name];\
      if (!ingId) continue;\
      await prisma.recipeIngredient.create(\{\
        data: \{ recipeId: recipe.id, ingredientId: ingId, quantity: Number(qty), unit, notes \}\
      \});\
    \}\
  \}\
\
  console.log("Seed complete");\
\}\
\
main().catch((e) => \{ console.error(e); process.exit(1); \}).finally(()=>prisma.$disconnect());\
}