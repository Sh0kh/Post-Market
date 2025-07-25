import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// 🔹 Статистика карточки (вручную для примера)
const stats = [
  {
    label: "Bugungi foyda",
    value: "2 450 000 UZS",
    icon: <DollarSign className="w-7 h-7 text-green-500" />,
    color: "bg-green-100",
  },
  {
    label: "Qarzdorlar soni",
    value: 12,
    icon: <AlertCircle className="w-7 h-7 text-red-500" />,
    color: "bg-red-100",
  },
  {
    label: "Bu oy daromad",
    value: "45 200 000 UZS",
    icon: <DollarSign className="w-7 h-7 text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    label: "O‘sish darajasi",
    value: "+8.4%",
    icon: <TrendingUp className="w-7 h-7 text-purple-500" />,
    color: "bg-purple-100",
  },
];

// 🔸 Oylik daromadlar grafigi
const incomeChart = [
  { oy: "Yan", daromad: 18000000 },
  { oy: "Fev", daromad: 22000000 },
  { oy: "Mar", daromad: 25000000 },
  { oy: "Apr", daromad: 21000000 },
  { oy: "May", daromad: 27000000 },
  { oy: "Iyun", daromad: 30000000 },
  { oy: "Iyul", daromad: 45200000 },
];

// 🔸 Qarzdorlar soni haftalik
const debtorsChart = [
  { kun: "Dush", qarzdor: 3 },
  { kun: "Sesh", qarzdor: 4 },
  { kun: "Chor", qarzdor: 5 },
  { kun: "Pay", qarzdor: 2 },
  { kun: "Juma", qarzdor: 6 },
  { kun: "Shan", qarzdor: 3 },
  { kun: "Yak", qarzdor: 1 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen mt-[90px]  py-10 bg-gray-50">
      {/* 📊 Cardlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-7xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Grafiklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Oylik daromad */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Oylik Daromadlar (UZS)
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={incomeChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="oy" stroke="#6b7280" fontSize={12} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(v) => (v / 1000000).toFixed(0) + "m"}
              />
              <Tooltip
                formatter={(val) =>
                  `${val.toLocaleString()} UZS`
                }
              />
              <Line
                type="monotone"
                dataKey="daromad"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5, fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Haftalik qarzdorlar soni */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Haftalik Qarzdorlar
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={debtorsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="kun" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="qarzdor" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
