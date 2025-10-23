import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function LearnPage(){
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } })
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Learn</h1>
      {skills.map(s => (
        <div key={s.id} className="border rounded-lg p-3">
          <div className="font-semibold">{s.title}</div>
          <ul className="list-disc pl-5">
            {s.lessons.map(l => (
              <li key={l.id}>
                <Link href={`/learn/${s.slug}/${l.slug}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
