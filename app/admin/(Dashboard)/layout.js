import { Inter, Playfair_Display } from "next/font/google";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Admin Dashboard - Finest Gemological Laboratory (FGL)",
  description: "Admin panel for FGL gemological services",
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${inter.variable} ${playfair.variable} bg-gray-50`}>
      <AdminNavbar />
      <div className="flex min-h-screen pt-16">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
