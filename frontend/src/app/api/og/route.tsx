// src/app/api/og/route.tsx
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Happy Birthday!'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#fef3c7',
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#b91c1c',
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 24, color: '#1f2937', marginTop: 8 }}>
          Surprise Birthday 🎉
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
