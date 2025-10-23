import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Demo user
  const demo = await prisma.user.upsert({
    where: { email: 'demo@uci.edu' },
    update: {},
    create: {
      email: 'demo@uci.edu',
      password: bcrypt.hashSync('password123', 10),
      displayName: 'Peter Anteater'
    }
  })

  const ingredients = [
    ['banana','fruit',null,null,'Choose slightly speckled for sweetness'],
    ['apple','fruit',null,null,'Keep refrigerated for 5–7 days'],
    ['avocado','fruit',null,null,'Ripen at room temp; refrigerate when soft'],
    ['onion','vegetable',null,null,'Cool, dark place; not in fridge'],
    ['tomato','vegetable',null,null,'Room temp; avoid fridge for best flavor'],
    ['garlic','vegetable','clove',null,'Cool, dry place; ventilated'],
    ['rice','grain','cup',null,'Store dry; rinse before cooking'],
    ['pasta','grain','g',null,'Store dry; 8–12 min boil'],
    ['chicken breast','protein','g',null,'Keep chilled; cook to 165°F/74°C'],
    ['tofu','protein','g',null,'Refrigerate; press before cooking'],
    ['egg','protein','count',null,'Refrigerate; 3–5 weeks'],
    ['spinach','vegetable','g',null,'Refrigerate; rinse before use'],
    ['bell pepper','vegetable','count',null,'Crisp, unblemished skin'],
    ['carrot','vegetable','g',null,'Refrigerate; in crisper'],
    ['potato','vegetable','count',null,'Cool, dark place'],
    ['broccoli','vegetable','g',null,'Refrigerate; use within 3–5 days'],
    ['mushroom','vegetable','g',null,'Paper bag in fridge'],
    ['oats','grain','g',null,'Airtight container'],
    ['milk','dairy','ml',null,'Keep below 40°F/4°C'],
    ['yogurt','dairy','ml',null,'Refrigerate; check date'],
    ['cheddar','dairy','g',null,'Wrap tightly; refrigerate'],
    ['tortilla','grain','count',null,'Seal; refrigerate after open'],
    ['canned beans','protein','g',null,'Rinse before use'],
    ['canned tuna','protein','g',null,'Drain before use'],
    ['soy sauce','other','ml',null,'Shelf stable; refrigerate after opening'],
  ]

  const ingMap: Record<string,string> = {}
  for (const [name,category,unit,image,tips] of ingredients) {
    const ing = await prisma.ingredient.upsert({
      where: { name },
      update: {},
      create: { name, category, unit: unit as any, image: image as any, tips: tips as any }
    })
    ingMap[name] = ing.id
  }

  // Helper
  async function recipe(data: any, steps: any[], ris: any[]) {
    const r = await prisma.recipe.create({ data })
    for (let i=0;i<steps.length;i++){
      const s = steps[i]
      await prisma.step.create({ data: { recipeId: r.id, index: i, ...s } })
    }
    for (const ri of ris){
      await prisma.recipeIngredient.create({ data: { recipeId: r.id, ...ri } })
    }
    return r
  }

  // 1) Microwave Mug Omelette
  await recipe({
    title:'Microwave Mug Omelette',
    slug:'microwave-mug-omelette',
    image:'/sample-images/mug-omelette.jpg',
    minutes:2, costCents:150, servings:1,
    tools: JSON.stringify(['Microwave','Mug']),
    tags: JSON.stringify(['Quick','Breakfast','≤5 ingredients','Budget']),
    createdById: demo.id, approved: true
  }, [
    { text:'Crack 2 eggs into a mug; whisk.', timerSec: null },
    { text:'Add spinach and cheddar; stir.', timerSec: null },
    { text:'Microwave on High', timerSec: 90 }
  ], [
    { ingredientId: ingMap['egg'], quantity: 2, unit: 'count', notes: '' },
    { ingredientId: ingMap['spinach'], quantity: 30, unit: 'g', notes: '' },
    { ingredientId: ingMap['cheddar'], quantity: 20, unit: 'g', notes: 'Can use dairy-free cheese' }
  ])

  // 2) Avocado Toast
  await recipe({
    title:'Avocado Toast',
    slug:'avocado-toast',
    image:'/sample-images/avocado-toast.jpg',
    minutes:5, costCents:200, servings:1,
    tools: JSON.stringify(['Toaster','Knife']),
    tags: JSON.stringify(['Vegetarian','Quick','≤5 ingredients']),
    createdById: demo.id, approved: true
  }, [
    { text:'Toast tortilla until crisp or use bread.', timerSec: null },
    { text:'Mash avocado; spread over base.', timerSec: null },
    { text:'Top with tomato slices and pinch of salt.', timerSec: null }
  ], [
    { ingredientId: ingMap['tortilla'], quantity: 1, unit: 'count', notes:'Use bread if preferred' },
    { ingredientId: ingMap['avocado'], quantity: 0.5, unit: 'count', notes:'' },
    { ingredientId: ingMap['tomato'], quantity: 0.5, unit: 'count', notes:'' }
  ])

  // 3) Garlic Butter Pasta
  await recipe({
    title:'Garlic Butter Pasta',
    slug:'garlic-butter-pasta',
    image:'/sample-images/garlic-pasta.jpg',
    minutes:12, costCents:180, servings:2,
    tools: JSON.stringify(['Pot','Stove']),
    tags: JSON.stringify(['Quick','≤5 ingredients','Budget']),
    createdById: demo.id, approved: true
  }, [
    { text:'Boil pasta until al dente.', timerSec: 600 },
    { text:'Sauté garlic 1 min; toss with pasta and butter.', timerSec: 60 },
    { text:'Season and serve.', timerSec: null },
  ], [
    { ingredientId: ingMap['pasta'], quantity: 200, unit: 'g', notes:'' },
    { ingredientId: ingMap['garlic'], quantity: 2, unit: 'clove', notes:'Use garlic powder if needed' }
  ])

  // 4) Air Fryer Tofu Bites
  await recipe({
    title:'Air Fryer Tofu Bites',
    slug:'air-fryer-tofu-bites',
    image:'/sample-images/tofu-bites.jpg',
    minutes:15, costCents:250, servings:2,
    tools: JSON.stringify(['Air Fryer']),
    tags: JSON.stringify(['Vegan','Quick','Budget']),
    createdById: demo.id, approved: true
  }, [
    { text:'Press tofu; toss with soy sauce.', timerSec: null },
    { text:'Air fry until crisp.', timerSec: 900 }
  ], [
    { ingredientId: ingMap['tofu'], quantity: 300, unit: 'g', notes:'' },
    { ingredientId: ingMap['soy sauce'], quantity: 15, unit: 'ml', notes:'' }
  ])

  // 5) Tuna Rice Bowl (Microwave)
  await recipe({
    title:'Tuna Rice Bowl',
    slug:'tuna-rice-bowl',
    image:'/sample-images/tuna-rice.jpg',
    minutes:10, costCents:230, servings:1,
    tools: JSON.stringify(['Microwave','Bowl']),
    tags: JSON.stringify(['Budget','≤5 ingredients']),
    createdById: demo.id, approved: true
  }, [
    { text:'Microwave cooked rice to warm.', timerSec: 90 },
    { text:'Top with canned tuna and soy sauce.', timerSec: null }
  ], [
    { ingredientId: ingMap['rice'], quantity: 200, unit: 'g', notes:'Use microwave rice' },
    { ingredientId: ingMap['canned tuna'], quantity: 120, unit: 'g', notes:'' },
    { ingredientId: ingMap['soy sauce'], quantity: 10, unit: 'ml', notes:'' }
  ])

  // 6) Veggie Stir-Fry
  await recipe({
    title:'Veggie Stir-Fry',
    slug:'veggie-stir-fry',
    image:'/sample-images/stirfry.jpg',
    minutes:14, costCents:250, servings:2,
    tools: JSON.stringify(['Pan','Stove']),
    tags: JSON.stringify(['Vegan','Quick','Budget']),
    createdById: demo.id, approved: true
  }, [
    { text:'High heat pan with oil.', timerSec: null },
    { text:'Stir-fry broccoli, bell pepper, carrot.', timerSec: 300 },
    { text:'Add soy sauce; toss.', timerSec: 60 }
  ], [
    { ingredientId: ingMap['broccoli'], quantity: 150, unit: 'g', notes:'' },
    { ingredientId: ingMap['bell pepper'], quantity: 1, unit: 'count', notes:'' },
    { ingredientId: ingMap['carrot'], quantity: 100, unit: 'g', notes:'' },
    { ingredientId: ingMap['soy sauce'], quantity: 15, unit: 'ml', notes:'Use teriyaki as swap' }
  ])

  // 7) Overnight Oats
  await recipe({
    title:'Overnight Oats',
    slug:'overnight-oats',
    image:'/sample-images/overnight-oats.jpg',
    minutes:5, costCents:150, servings:1,
    tools: JSON.stringify(['Fridge','Jar']),
    tags: JSON.stringify(['Vegetarian','Breakfast','≤5 ingredients','Budget']),
    createdById: demo.id, approved: true
  }, [
    { text:'Combine oats and milk in jar; stir.', timerSec: null },
    { text:'Refrigerate overnight.', timerSec: 0 }
  ], [
    { ingredientId: ingMap['oats'], quantity: 60, unit: 'g', notes:'' },
    { ingredientId: ingMap['milk'], quantity: 150, unit: 'ml', notes:'Can use almond milk' },
    { ingredientId: ingMap['yogurt'], quantity: 80, unit: 'ml', notes:'Optional' }
  ])

  // 8) Cheesy Broccoli Potato
  await recipe({
    title:'Cheesy Broccoli Potato',
    slug:'cheesy-broccoli-potato',
    image:'/sample-images/cheesy-potato.jpg',
    minutes:12, costCents:200, servings:1,
    tools: JSON.stringify(['Microwave']),
    tags: JSON.stringify(['Vegetarian','Budget','≤5 ingredients']),
    createdById: demo.id, approved: true
  }, [
    { text:'Microwave potato until tender.', timerSec: 600 },
    { text:'Top with steamed broccoli and cheddar.', timerSec: 120 }
  ], [
    { ingredientId: ingMap['potato'], quantity: 1, unit: 'count', notes:'' },
    { ingredientId: ingMap['broccoli'], quantity: 100, unit: 'g', notes:'' },
    { ingredientId: ingMap['cheddar'], quantity: 30, unit: 'g', notes:'Can use mozzarella' }
  ])

  // Skills / Lessons (3 x 4)
  const skillData = [
    { title:'Knife Basics', slug:'knife-basics', order:1, lessons:[
      ['Holding a Knife Safely','holding-a-knife-safely','Which grip is safest?',['Pinch grip','Handle-only','Overhand','Claw'],0],
      ['Dicing an Onion','dicing-an-onion','Best first cut?',['Root to tip','Across equator','Random','Peel only'],0],
      ['Julienne Cuts','julienne-cuts','Julienne size?',['1-2mm','1cm','2cm','5mm'],0],
      ['Mincing Garlic','mincing-garlic','Smash before mince?',['Yes','No','Only roasted','Never'],0],
    ]},
    { title:'Eggs 101', slug:'eggs-101', order:2, lessons:[
      ['Scrambled','scrambled','Heat for creamy?',['Low','High','Max','Microwave only'],0],
      ['Fried','fried','When to flip?',['When whites set','Immediately','Never','After yolk bursts'],0],
      ['Poached','poached','Water should be?',['Barely simmering','Rolling boil','Cold','Bubbling hard'],0],
      ['Omelette','omelette','Filling added when?',['When eggs just set','At start','After plated','Never'],0],
    ]},
    { title:'Stir-Fry Starter', slug:'stir-fry-starter', order:3, lessons:[
      ['Prep','prep','Key prep?',['Uniform cuts','Random','Wet veggies','No prep'],0],
      ['High Heat Technique','high-heat','Oil temp?',['High','Low','Off','Medium'],0],
      ['Sauce Basics','sauce-basics','Thickener?',['Cornstarch','Flour','Sugar','Butter'],0],
      ['Protein + Veg Combos','protein-veg','Cook order?',['Hard veg first','Sauce first','Protein last','All at once'],0],
    ]},
  ]

  for (const s of skillData){
    const skill = await prisma.skill.create({ data: { title: s.title, slug: s.slug, order: s.order } })
    for (let i=0;i<s.lessons.length;i++){
      const [title,slug,question,options,correct] = s.lessons[i] as any
      const quiz = { questions:[{ q: question, options, correct }] }
      await prisma.lesson.create({
        data: {
          skillId: skill.id,
          title, slug, order: i+1,
          contentMd: `# ${title}\n\nPractical, short lesson for ${s.title}.`,
          quizJson: JSON.stringify(quiz)
        }
      })
    }
  }

  // Achievements
  const achievements = [
    ['FIRST_CHOP','Complete your first Knife Basics lesson','🔪'],
    ['BREAKFAST_BOSS','Cook 5 breakfast recipes','🍳'],
    ['BUDGET_BENDER','Cook 10 recipes under $2','💵'],
  ]
  for (const [code,desc,icon] of achievements){
    await prisma.achievement.upsert({
      where: { code },
      update: { desc, icon },
      create: { code, name: code.replaceAll('_',' '), desc, icon }
    })
  }

  console.log('Seed complete. Demo user: demo@uci.edu / password123')
}

main().finally(()=>prisma.$disconnect())
