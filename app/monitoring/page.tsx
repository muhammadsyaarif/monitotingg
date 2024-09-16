'use client';
import supabase from "@/lib/supabase"; // Adjust the path as necessary
import { useEffect, useState, useCallback } from "react";
import { Bar } from 'react-chartjs-2';
import Link from 'next/link'; 
import Image from 'next/image'; // Import Image from Next.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonitoringPage() {
  const [data, setData] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [startDate, setStartDate] = useState<string>(''); // For filtering by start date
  const [endDate, setEndDate] = useState<string>(''); // For filtering by end date

  // Fetch data from Supabase, including the "jam" column
  const fetchData = useCallback(async () => {
    let query = supabase
      .from("suhu")
      .select("id, suhu, kelembapan, jarak, gas, jam")
      .order("id", { ascending: false })
      .limit(10);

    if (startDate && endDate) {
      query = query.gte("jam", startDate).lte("jam", endDate); // Use "jam" column for date filtering
    }

    const { data: fetchedData } = await query;
    setData(fetchedData ?? []);
  }, [startDate, endDate]);

  // Fetch data and set interval for real-time updates
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      setCurrentTime(new Date().toLocaleTimeString());
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [fetchData]);

  // Prepare chart data using the "jam" column for labels
  const suhuChartData = {
    labels: data.map((item) => new Date(item.jam).toLocaleTimeString()).concat(currentTime),
    datasets: [
      {
        label: 'Suhu (°C)',
        data: data.map((item) => item.suhu),
        backgroundColor: 'rgba(66, 165, 245, 0.7)',
        borderColor: '#42A5F5',
        borderWidth: 5,
      },
    ],
  };

  const kelembapanChartData = {
    labels: data.map((item) => new Date(item.jam).toLocaleTimeString()).concat(currentTime),
    datasets: [
      {
        label: 'Kelembapan (%)',
        data: data.map((item) => item.kelembapan),
        backgroundColor: 'rgba(102, 187, 106, 0.7)',
        borderColor: '#66BB6A',
        borderWidth: 5,
      },
    ],
  };

  const jarakChartData = {
    labels: data.map((item) => new Date(item.jam).toLocaleTimeString()).concat(currentTime),
    datasets: [
      {
        label: 'Jarak (cm)',
        data: data.map((item) => item.jarak),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: '#FF9F40',
        borderWidth: 5,
      },
    ],
  };

  const gasChartData = {
    labels: data.map((item) => new Date(item.jam).toLocaleTimeString()).concat(currentTime),
    datasets: [
      {
        label: 'Gas',
        data: data.map((item) => item.gas),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: '#FF6384',
        borderWidth: 5,
      },
    ],
  };

  // Chart options with dark theme adjustments
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
        },
      },
      title: {
        display: true,
        text: '',
        color: '#ffffff',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#000000',
        borderColor: '#cccccc',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white font-sans">
      {/* Scrolling Marquee */}
      <div className="marquee-container overflow-hidden whitespace-nowrap bg-gray-800 py-2">
        <p className="marquee-text animate-marquee text-2xl font-bold text-yellow-300">
          Alat Monitoring Suhu, Kelembapan, Jarak & Gas &nbsp;&nbsp;&nbsp;
        </p>
      </div>

      <div className="flex flex-col mx-10 my-10">
       

        <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
          {/* Suhu Chart */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex-1 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-center mb-4">Monitoring Suhu (°C)</h2>
            <Bar data={suhuChartData} options={{ ...options, plugins: { ...options.plugins, title: { text: 'Suhu' } } }} />
          </div>

          {/* Kelembapan Chart */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex-1 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-center mb-4">Monitoring Kelembapan (%)</h2>
            <Bar data={kelembapanChartData} options={{ ...options, plugins: { ...options.plugins, title: { text: 'Kelembapan' } } }} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4 mt-4">
          {/* Jarak Chart */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex-1 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-center mb-4">Monitoring Jarak (cm)</h2>
            <Bar data={jarakChartData} options={{ ...options, plugins: { ...options.plugins, title: { text: 'Jarak' } } }} />
          </div>

          {/* Gas Chart */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex-1 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-center mb-4">Monitoring Gas</h2>
            <Bar data={gasChartData} options={{ ...options, plugins: { ...options.plugins, title: { text: 'Gas' } } }} />
          </div>
        </div>

        {/* Button to go back to homepage */}
        <div className="flex justify-center my-4">
      <Link href="/" className="relative inline-block px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-green-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        Home
      </Link>
        </div>
      </div>
    </div>
  );
}
