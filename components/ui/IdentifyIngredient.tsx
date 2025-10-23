'use client'
import { useState } from 'react'

export default function IdentifyIngredient({ onMessage }: { onMessage?: (m: string)=>void }){
  const [preview, setPreview] = useState<string|null>(null)
  const [guess, setGuess] = useState<any>(null)
  const [busy, setBusy] = useState(false)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]
    if (!f) return
    setPreview(URL.createObjectURL(f))
    const fd = new FormData()
    fd.set('file', f)
    setBusy(true)
    try {
      const res = await fetch('/api/recognize', { method: 'POST', body: fd })
      const data = await res.json()
      setGuess(data)
      onMessage?.(`Recognized: ${data.ingredientId ? 'confident match' : 'needs confirmation'}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border rounded-lg p-3 grid gap-3">
      <div className="font-semibold">Identify Ingredient</div>
      <input type="file" accept="image/*" onChange={onFile} />
      {preview && <img src={preview} alt="preview" className="w-48 rounded" />}
      {busy && <div>Processing…</div>}
      {guess && (
        <div className="text-sm">
          {guess.ingredientId ? (
            <div className="badge">High confidence</div>
          ) : (
            <div>
              <div className="mb-1">Low confidence. Pick one:</div>
              <div className="flex gap-2">
                {guess.alternatives?.map((a: any, i: number)=>(
                  <button key={i} className="px-2 py-1 border rounded" onClick={()=>setGuess({ ...guess, ingredientId: a.ingredientId })}>{a.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
