import Link from "next/link";
import {
  FaFileInvoiceDollar,
  FaCertificate,
  FaImages,
  FaChartLine,
  FaUserFriends,
  FaGem,
} from "react-icons/fa";

export default function AdminDashboard() {
  // Sample data for dashboard
  const stats = [
    // {
    //   title: "Total Invoices",
    //   value: "324",
    //   icon: <FaFileInvoiceDollar size={24} />,
    //   color: "bg-indigo-100 text-indigo-600",
    // },
    {
      title: "Reports Issued",
      value: "287",
      icon: <FaCertificate size={24} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Gallery Images",
      value: "152",
      icon: <FaImages size={24} />,
      color: "bg-amber-100 text-amber-600",
    },
    // {
    //   title: "Total Revenue",
    //   value: "$48,294",
    //   icon: <FaChartLine size={24} />,
    //   color: "bg-rose-100 text-rose-600",
    // },
    // {
    //   title: "Clients",
    //   value: "87",
    //   icon: <FaUserFriends size={24} />,
    //   color: "bg-blue-100 text-blue-600",
    // },
    // {
    //   title: "Gems Analyzed",
    //   value: "346",
    //   icon: <FaGem size={24} />,
    //   color: "bg-violet-100 text-violet-600",
    // },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">
          Dashboard
        </h1>
        <p className="text-accent/80">Welcome to the FGL admin panel.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="premium-card p-6 flex items-center">
            <div
              className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mr-4`}
            >
              {stat.icon}
            </div>
            <div>
              <h3 className="text-accent/80 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-heading font-bold text-primary mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* <Link
          href="/admin/invoices/create"
          className="premium-card p-6 flex flex-col items-center justify-center text-center hover:border-secondary border-2 border-transparent transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FaFileInvoiceDollar className="text-primary text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-primary mb-2">
            Generate Invoice
          </h3>
          <p className="text-accent/80">Create new client invoices</p>
        </Link> */}

        <Link
          href="/admin/reports/create"
          className="premium-card p-6 flex flex-col items-center justify-center text-center hover:border-secondary border-2 border-transparent transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FaCertificate className="text-primary text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-primary mb-2">
            Issue Report
          </h3>
          <p className="text-accent/80">Create gemstone reports</p>
        </Link>

        <Link
          href="/admin/images/create"
          className="premium-card p-6 flex flex-col items-center justify-center text-center hover:border-secondary border-2 border-transparent transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FaImages className="text-primary text-2xl" />
          </div>
          <h3 className="text-xl font-heading font-bold text-primary mb-2">
            Post Image
          </h3>
          <p className="text-accent/80">Upload new gallery images</p>
        </Link>
      </div>

      {/* Recent Activity */}
      {/* <h2 className="text-2xl font-heading font-bold text-primary mb-6">
        Recent Activity
      </h2>
      <div className="premium-card p-6 mb-8">
        <div className="space-y-4">
          {[
            {
              action: "Certificate generated",
              item: "Ruby - 3.4ct",
              time: "2 hours ago",
            },
            {
              action: "Invoice created",
              item: "INV-20250407-001",
              time: "3 hours ago",
            },
            {
              action: "Image uploaded",
              item: "Sapphire inclusion",
              time: "Yesterday",
            },
            {
              action: "Certificate updated",
              item: "Emerald - 2.1ct",
              time: "Yesterday",
            },
            {
              action: "Invoice paid",
              item: "INV-20250406-003",
              time: "2 days ago",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-primary">{item.action}</p>
                <p className="text-sm text-accent/70">{item.item}</p>
              </div>
              <span className="text-sm text-accent/60">{item.time}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
