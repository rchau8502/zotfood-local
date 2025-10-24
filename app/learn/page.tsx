import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function LearnPage() {
  const skills = await prisma.skill.findMany({
    include: {
      lessons: {
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  });

  // Flatten all lessons from all skills
  const allLessons = skills.flatMap(skill => 
    skill.lessons.map(lesson => ({
      ...lesson,
      skillSlug: skill.slug
    }))
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Learn</h1>
        <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">← Back to Dashboard</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allLessons.map(lesson => (
          <article key={lesson.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-medium">{lesson.title}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {lesson.contentMd.split('\n').find(line => line.trim() && !line.startsWith('#'))?.substring(0, 50) + '...' || 'Learn essential cooking skills.'}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">5 min</span>
              <Link
                href={`/learn/${lesson.skillSlug}/${lesson.slug}`}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                Start
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

