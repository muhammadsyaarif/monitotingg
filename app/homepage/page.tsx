'use client';

import Link from 'next/link'; // Import untuk navigasi
import { useEffect, useState } from 'react'; // Import untuk hooks
import supabase from "@/lib/supabase"; // Import untuk koneksi ke Supabase
import Image from 'next/image'; // Import untuk optimasi gambar

export default function Homepage() {
  // State untuk menyimpan data dari Supabase
  const [temperature, setTemperature] = useState<number | null>(null);
  const [jarak, setJarak] = useState<number | null>(null);
  const [gas, setGas] = useState<number | null>(null);

  // Fungsi untuk mengambil data terbaru dari database Supabase
  const fetchLatestData = async () => {
    const { data, error } = await supabase
      .from("suhu") // Ambil dari tabel "suhu"
      .select("suhu, jarak, gas") // Ambil kolom "suhu", "jarak", dan "gas"
      .order("id", { ascending: false }) // Urutkan dari data terbaru
      .limit(1) // Ambil 1 data terbaru
      .single(); // Ambil satu baris data

    if (error) {
      console.error("Error fetching data:", error); // Log error jika ada
      return;
    }

    // Set data suhu, jarak, dan gas ke state
    setTemperature(data ? data.suhu : null);
    setJarak(data ? data.jarak : null);
    setGas(data ? data.gas : null);
  };

  // useEffect untuk mengambil data secara berkala setiap 5 detik
  useEffect(() => {
    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 5000); // Update data setiap 5 detik

    return () => clearInterval(intervalId); // Clear interval saat komponen unmount
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-8 bg-white text-black">
      {/* Overlay untuk menambahkan kontras antara background dan teks */}
      <div className="absolute inset-0 bg-white opacity-100"></div>

      {/* Konten utama diletakkan di atas overlay dengan z-index lebih tinggi */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6 animate-pulse">
          Monitoring Suhu, Kelembapan, Gas & Jarak
        </h1>

        {/* Deskripsi */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Pantau kondisi lingkungan Anda secara real-time dan akurat dengan alat kami yang canggih. Klik tombol di bawah untuk memulai pengalaman Anda!
        </p>

        {/* Menampilkan Data */}
        <div className="mt-10 space-y-6">
          <h2 className="text-3xl font-bold">Data Terkini:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {temperature !== null ? (
              <p className="text-2xl font-semibold bg-purple-600 p-4 rounded-lg shadow-lg text-white">
                Suhu: {temperature} °C
              </p>
            ) : (
              <p className="text-lg">Mengambil data suhu...</p>
            )}
            {jarak !== null ? (
              <p className="text-2xl font-semibold bg-pink-600 p-4 rounded-lg shadow-lg text-white">
                Jarak: {jarak} cm
              </p>
            ) : (
              <p className="text-lg">Mengambil data jarak...</p>
            )}
            {gas !== null ? (
              <p className="text-2xl font-semibold bg-blue-600 p-4 rounded-lg shadow-lg text-white">
                Gas: {gas} Ppm
              </p>
            ) : (
              <p className="text-lg">Mengambil data gas...</p>
            )}
          </div>
        </div>

        {/* Ilustrasi Gambar */}
        <div className="my-12">
          <Image
            src="/1.jpg"
            alt="Monitoring Suhu dan Kelembapan"
            width={600}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Tombol CTA dan teks di tengah */}
        <div className="flex flex-col space-y-4 mt-6 items-center text-center">
          <Link href="/monitoring" className="relative inline-block px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 transition duration-300 ease-in-out">
            Lihat Monitoring
          </Link>
          

          {/* Informasi tambahan di bawah tombol */}
          <div className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold">Mengapa Memilih Kami?</h2>
            <ul className="list-disc list-inside space-y-2 text-center mx-auto max-w-xl">
              <li>Data real-time yang akurat dan up-to-date</li>
              <li>Antarmuka yang mudah digunakan dan intuitif</li>
              <li>Visualisasi data yang interaktif dan menarik</li>
            </ul>
            <Link href="/AboutUs" className="relative inline-block px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 transition duration-300 ease-in-out">
            About Us
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
