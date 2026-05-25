import Image from 'next/image'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Logo Desa"
            width={100}
            height={100}
            className="h-24 w-auto"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Situs Sedang Dalam Pemeliharaan
          </h1>
          <p className="text-gray-600">
            Kami sedang melakukan pembaruan rutin untuk meningkatkan layanan informasi desa. 
            Silakan kembali lagi nanti.
          </p>
        </div>
        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">
            Terima kasih atas kesabaran Anda.
          </p>
        </div>
      </div>
    </div>
  )
}
