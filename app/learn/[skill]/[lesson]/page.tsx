import { prisma } from '@/lib/db'

export default async function LessonPage({ params }: { params: { skill: string, lesson: string } }){
  const skill = await prisma.skill.findUnique({ where: { slug: params.skill } })
  const lesson = await prisma.lesson.findFirst({ where: { slug: params.lesson, skillId: skill?.id } })
  if (!lesson) return <div>Not found</div>
  const quiz = JSON.parse(lesson.quizJson)
  return (
    <article className="grid gap-4">
      <h1 className="text-2xl font-semibold">{lesson.title}</h1>
      <div className="prose whitespace-pre-wrap">{lesson.contentMd}</div>
      <div className="p-3 border rounded-lg">
        <div className="font-semibold mb-2">Quick Check</div>
        <ul className="list-disc pl-5">
          {quiz.questions.map((q: any, i: number) => (
            <li key={i}>{q.q}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
