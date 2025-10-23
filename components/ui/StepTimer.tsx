'use client'
import { useEffect, useRef, useState } from 'react'

export default function StepTimer({ seconds, onComplete }: { seconds: number, onComplete?: ()=>void }){
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const idRef = useRef<number | null>(null)

  useEffect(()=>{
    if (!running) return
    idRef.current = window.setInterval(()=>{
      setLeft(prev => {
        if (prev <= 1){
          window.clearInterval(idRef.current!)
          onComplete?.()
          try { navigator.vibrate?.(200) } catch {}
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return ()=>{ if (idRef.current) window.clearInterval(idRef.current) }
  }, [running])

  return (
    <div className="flex items-center gap-2">
      <div className="font-mono">{left}s</div>
      <button className="px-2 py-1 border rounded" onClick={()=>setRunning(!running)}>{running?'Pause':'Start'}</button>
      <button className="px-2 py-1 border rounded" onClick={()=>{ setLeft(seconds); setRunning(false) }}>Reset</button>
    </div>
  )
}
