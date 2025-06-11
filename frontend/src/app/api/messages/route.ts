import { NextResponse } from 'next/server'

type Msg = { id: number; name: string; message: string }

// ตัวอย่างเก็บชั่วคราวในตัวแปร (จริงควรใช้ DB/Firestore/etc.)
let messages: Msg[] = [
  { id: 1, name: 'Alice', message: 'สุขสันต์วันเกิดนะจ๊ะ! 🎂' },
]

export async function GET() {
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const { name, message } = await request.json()
  const id = messages.length ? messages[messages.length - 1].id + 1 : 1
  messages.push({ id, name, message })
  return NextResponse.json({ success: true })
}
