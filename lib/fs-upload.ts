import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function saveUpload(file: File): Promise<string> {
  const date = new Date()
  const dir = path.join(process.cwd(), 'public', 'uploads', `${date.getFullYear()}-${date.getMonth()+1}`)
  await fs.mkdir(dir, { recursive: true })

  const ext = path.extname(file.name) || '.jpg'
  const filename = `${crypto.randomUUID()}${ext}`
  const filepath = path.join(dir, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filepath, buffer)

  return `/uploads/${date.getFullYear()}-${date.getMonth()+1}/${filename}`
}
