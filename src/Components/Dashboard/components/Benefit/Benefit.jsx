import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, Filter, DollarSign, Clock } from 'lucide-react';

function generateSalesData(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const data = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    data.push({
      date: current.toISOString().slice(0, 10),
      amount: Math.floor(Math.random() * 50000) + 10000,
    });
    current.setDate(current.getDate() + 1);
  }
  return data;
}

export default function DailySalesChart() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);
    setStartDate(first);
    setEndDate(last);
    setData(generateSalesData(first, last));
  }, []);

  const filterData = () => {
    if (startDate && endDate) {
      setData(generateSalesData(startDate, endDate));
    }
  };

  const chartData = data.map((item) => ({
    ...item,
    day: new Date(item.date).getDate(),
    formattedDate: new Date(item.date).toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
    }),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 p-2 shadow rounded">
          <p className="text-sm font-medium text-gray-800">Sana: {data.formattedDate}</p>
          <p className="text-sm text-gray-600">Sotuv: {data.amount.toLocaleString()} UZS</p>
        </div>
      );
    }
    return null;
  };

  const totalSales = data.reduce((sum, item) => sum + item.amount, 0);

  const today = new Date().toISOString().slice(0, 10);
  const todaySales = data.find((item) => item.date === today)?.amount || 0;

  return (
    <div className="max-w-7xl mx-auto  pt-[100px] pb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Kunlik Sotuvlar Statistikasi</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Umumiy Sotuvlar</p>
            <p className="text-2xl font-bold text-gray-900">{totalSales.toLocaleString()} UZS</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-gray-700" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Bugungi Sotuvlar</p>
            <p className="text-2xl font-bold text-gray-900">{todaySales.toLocaleString()} UZS</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Davr:</span>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        />
        <span className="text-sm">-</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        />
        <button
          onClick={filterData}
          className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#374151" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
