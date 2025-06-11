export interface Memory {
  id: string
  date: string
  title: string
  description: string
}

export const memories: Memory[] = [
  {
    id: '1',
    date: '2023-08-15',
    title: 'Our First Date',
    description:
      'We met at the park, shared ice cream and talked for hours under the trees.',
  },
  {
    id: '2',
    date: '2024-02-14',
    title: 'Valentine’s Dinner',
    description:
      'A candlelit dinner on the rooftop, watching the city lights and fireworks.',
  },
  {
    id: '3',
    date: '2024-12-25',
    title: 'Christmas Morning',
    description:
      'Exchanging gifts by the Christmas tree and sipping hot cocoa together.',
  },
  // … เพิ่มเติมได้ตามใจ
]
