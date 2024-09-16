// pages/about.tsx

export default function AboutUs() {
          return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-8">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-lg max-w-2xl text-center">
                Kami adalah tim yang berkomitmen untuk menyediakan solusi monitoring lingkungan yang akurat dan efisien. 
                Dengan teknologi terkini, kami membantu Anda memantau kondisi lingkungan secara real-time oleh karena itu kami membuat alat yang bernama MOSUJAGA yaitu monitoring suhu jarak dan gas.
              </p>
              <p>
                Alat Dan Bahan yang dibutuhkan dalam pembuatan adalah esp32/atau mikrokontroler lainya, Sensor DHT11, Sensor Ultrasonik, Sensor MQ-2 
              </p>
            </div>
          );
        }
        