"use client";

import { useState } from "react";
import {
  FaChartLine,
  FaCalendarAlt,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("monthly");

  // Sample monthly revenue data
  const monthlyData = [
    { month: "Jan", revenue: 12500, invoices: 28, certificates: 45 },
    { month: "Feb", revenue: 15200, invoices: 32, certificates: 52 },
    { month: "Mar", revenue: 18400, invoices: 41, certificates: 67 },
    { month: "Apr", revenue: 16800, invoices: 38, certificates: 59 },
    { month: "May", revenue: 21300, invoices: 47, certificates: 73 },
    { month: "Jun", revenue: 19600, invoices: 43, certificates: 68 },
    { month: "Jul", revenue: 23100, invoices: 52, certificates: 81 },
    { month: "Aug", revenue: 25400, invoices: 57, certificates: 89 },
    { month: "Sep", revenue: 22800, invoices: 51, certificates: 76 },
    { month: "Oct", revenue: 27200, invoices: 62, certificates: 94 },
    { month: "Nov", revenue: 24900, invoices: 56, certificates: 87 },
    { month: "Dec", revenue: 29500, invoices: 68, certificates: 102 },
  ];

  // Sample yearly data
  const yearlyData = [
    { year: "2021", revenue: 185000, invoices: 420, certificates: 650 },
    { year: "2022", revenue: 215000, invoices: 485, certificates: 742 },
    { year: "2023", revenue: 248000, invoices: 562, certificates: 834 },
    { year: "2024", revenue: 285000, invoices: 642, certificates: 921 },
    { year: "2025", revenue: 296700, invoices: 673, certificates: 893 },
  ];

  // Service breakdown data
  const serviceData = [
    { name: "Gemstone Certification", value: 45, color: "#9b111e" },
    { name: "Appraisal Services", value: 25, color: "#fba518" },
    { name: "Consultation", value: 20, color: "#1b2a41" },
    { name: "Equipment Testing", value: 10, color: "#e3c16f" },
  ];

  const currentData = timeRange === "yearly" ? yearlyData : monthlyData;
  const timeLabel = timeRange === "yearly" ? "year" : "month";

  // Calculate key metrics
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalInvoices = currentData.reduce(
    (sum, item) => sum + item.invoices,
    0
  );
  const totalCertificates = currentData.reduce(
    (sum, item) => sum + item.certificates,
    0
  );
  const avgRevenuePerMonth = Math.round(totalRevenue / currentData.length);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Analytics Dashboard
          </h1>
          <p className="text-accent/80">Revenue and performance insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="text-accent/60" />
          <select
            className="px-4 py-2 border border-gray-200 rounded-md bg-white"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="monthly">Monthly View</option>
            <option value="yearly">Yearly View</option>
          </select>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent/80 text-sm font-medium">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-primary">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-green-600 text-sm mt-1">
                +12.5% from last {timeRange === "yearly" ? "year" : "month"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FaDollarSign className="text-primary text-xl" />
            </div>
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent/80 text-sm font-medium">
                Invoices Generated
              </p>
              <p className="text-3xl font-bold text-primary">
                {totalInvoices.toLocaleString()}
              </p>
              <p className="text-blue-600 text-sm mt-1">
                +8.3% from last {timeRange === "yearly" ? "year" : "month"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FaFileInvoiceDollar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent/80 text-sm font-medium">
                Certificates Issued
              </p>
              <p className="text-3xl font-bold text-primary">
                {totalCertificates.toLocaleString()}
              </p>
              <p className="text-emerald-600 text-sm mt-1">
                +15.2% from last {timeRange === "yearly" ? "year" : "month"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <FaCertificate className="text-emerald-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent/80 text-sm font-medium">
                Avg Revenue/{timeRange === "yearly" ? "Year" : "Month"}
              </p>
              <p className="text-3xl font-bold text-primary">
                ${avgRevenuePerMonth.toLocaleString()}
              </p>
              <p className="text-amber-600 text-sm mt-1">+5.7% growth rate</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <FaChartLine className="text-amber-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="premium-card p-6 mb-8">
        <h3 className="text-xl font-heading font-bold text-primary mb-6">
          Revenue Trend ({timeRange === "yearly" ? "Yearly" : "Monthly"})
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={currentData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b111e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9b111e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={timeLabel} stroke="#666" fontSize={12} />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#9b111e"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Invoices vs Certificates Chart */}
        <div className="premium-card p-6">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">
            Invoices vs Certificates
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={timeLabel} stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="invoices" fill="#fba518" name="Invoices" />
              <Bar dataKey="certificates" fill="#1b2a41" name="Certificates" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Breakdown */}
        <div className="premium-card p-6">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">
            Service Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="premium-card p-6">
        <h3 className="text-xl font-heading font-bold text-primary mb-6">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              94.5%
            </div>
            <div className="text-sm text-accent/70">Client Satisfaction</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: "94.5%" }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">87.2%</div>
            <div className="text-sm text-accent/70">On-Time Delivery</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "87.2%" }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">91.8%</div>
            <div className="text-sm text-accent/70">Quality Score</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: "91.8%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
