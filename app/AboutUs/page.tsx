// pages/about.tsx

import Link from 'next/link'; // Import untuk navigasi
import Image from 'next/image'; // Import untuk optimasi gambar

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black p-8">
      {/* Gambar Header */}
      <div className="my-6">
        <Image
          src="/iot.jpg"
          alt="IoT Monitoring Illustration"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Header */}
      <h5 className="text-4xl font-bold mb-4">About Us</h5>

      {/* Deskripsi */}
      <p className="text-lg max-w-2xl text-center mb-6">
        Kami adalah tim yang berkomitmen untuk menyediakan solusi monitoring lingkungan yang akurat dan efisien. 
        Dengan teknologi terkini, kami membantu Anda memantau kondisi lingkungan secara real-time. Oleh karena itu, 
        kami membuat alat yang bernama <strong>MOSUJAGA</strong> yaitu monitoring suhu, jarak, dan gas.
      </p>

      {/* Informasi alat dan bahan */}
      <p className="text-lg max-w-2xl text-center mb-6">
        Alat dan bahan yang dibutuhkan dalam pembuatan adalah ESP32 atau mikrokontroler lainnya, Sensor DHT11, Sensor Ultrasonik, dan Sensor MQ-2.
      </p>

      {/* Tombol untuk kembali ke homepage */}
      <div className="flex flex-col space-y-4"> {/* Container untuk tombol dengan jarak */}
        <Link
          href="/homepage"
          className="relative inline-block px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-green-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out text-center"
        >
          Kembali ke Homepage
        </Link>

        {/* Tombol Monitoring dengan ukuran lebih kecil dan teks di tengah */}
        <Link
          href="/monitoring"
          className="relative inline-block px-3 py-2 text-sm font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 transition duration-300 ease-in-out text-center"
        >
          Monitoring
        </Link>
      </div>
    </div>
  );
}
