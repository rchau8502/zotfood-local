'use client'
import IdentifyIngredient from '@/components/ui/IdentifyIngredient'
import { useState } from 'react'

export default function PantryPage(){
  const [msg, setMsg] = useState<string>('')
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Pantry</h1>
      <IdentifyIngredient onMessage={setMsg} />
      {msg && <div className="badge">{msg}</div>}
    </div>
  )
}
