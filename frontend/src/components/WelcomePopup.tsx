'use client'

interface WelcomePopupProps {
  onConfirm: () => void
}

export default function WelcomePopup({ onConfirm }: WelcomePopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md p-8 text-center shadow-lg mx-4">
        <h2 className="text-2xl font-bold mb-4">ยินดีต้อนรับสู่เว็บไซต์เซอร์ไพรส์วันเกิด!</h2>
        <p className="mb-6">กดปุ่มด้านล่างเพื่อเริ่มนับถอยหลังและฟังเพลงตอนวันเกิด 🎉</p>
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          เริ่มเลย!
        </button>
      </div>
    </div>
  )
}
