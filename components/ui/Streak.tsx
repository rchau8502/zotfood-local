'use client'
import { useEffect, useState } from 'react'

export default function Streak(){
  const [data, setData] = useState<{displayName:string, streak:number, xp:number} | null>(null)
  useEffect(()=>{ (async()=>{
    const res = await fetch('/api/me')
    setData(await res.json())
  })() },[])
  if (!data) return <div className="border rounded-lg p-3">Loading…</div>
  return (
    <div className="border rounded-lg p-3 flex items-center justify-between">
      <div>🔥 <b>{data.streak}</b> day streak</div>
      <div className="text-sm">XP: {data.xp}</div>
    </div>
  )
}
