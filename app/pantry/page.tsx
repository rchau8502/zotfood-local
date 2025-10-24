import Link from "next/link";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export default async function PantryPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold mb-4">Please sign in to view your pantry</h1>
        <Link href="/api/auth/signin" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  // Get user's pantry items
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      pantry: {
        include: {
          ingredient: true
        }
      }
    }
  });

  const pantryItems = user?.pantry || [];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Pantry</h1>
        <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">← Back to Dashboard</Link>
      </div>

      {pantryItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your pantry is empty</h2>
          <p className="text-gray-600 mb-6">Add some ingredients to get started with recipe recommendations!</p>
          <Link 
            href="/submit" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Ingredients
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pantryItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold text-lg">{item.ingredient.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{item.ingredient.category}</p>
              {item.amount && (
                <p className="text-sm text-gray-500 mt-2">
                  Amount: {item.amount} {item.ingredient.unit || 'units'}
                </p>
              )}
              {item.ingredient.tips && (
                <p className="text-xs text-gray-400 mt-2 italic">{item.ingredient.tips}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
