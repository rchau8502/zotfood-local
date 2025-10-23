import Streak from '@/components/ui/Streak'

export default function DashboardPage(){
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Streak />
      <p>Welcome to your cooking journey. Jump into a lesson or match a recipe from your pantry!</p>
    </div>
  )
}
