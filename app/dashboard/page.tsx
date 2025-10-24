import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import Streak from "@/components/ui/Streak";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Welcome to your cooking journey. Jump into a lesson or match a recipe from your pantry!
          </p>
        </div>
        <Streak days={3} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Saved Recipes" value={12} emoji="📚" />
        <Stat label="Pantry Items" value={27} emoji="🥫" />
        <Stat label="Lessons Done" value={5} emoji="🎓" />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader title="Learn" subtitle="Bite-sized micro-lessons" />
          <CardBody className="space-y-4">
            <p className="text-sm text-slate-600">
              Build skills quickly with student-friendly lessons.
            </p>
            <Link
              href="/learn"
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
            >
              Start Learning
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recipes" subtitle="Quick, cheap, tasty" />
          <CardBody className="space-y-4">
            <p className="text-sm text-slate-600">
              Browse curated recipes that fit student budgets & kitchens.
            </p>
            <Link
              href="/recipes"
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
            >
              Explore Recipes
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Pantry" subtitle="Match what you already have" />
          <CardBody className="space-y-4">
            <p className="text-sm text-slate-600">
              Add ingredients and see recipes you can cook tonight.
            </p>
            <Link
              href="/pantry"
              className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-400 px-4 py-2.5 text-slate-900 hover:bg-yellow-300"
            >
              Open Pantry
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
