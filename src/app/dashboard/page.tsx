"use client";
import BinChart from "@/components/BinChart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BinCard } from "@/components/BinCard";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCcw, Trash2, AlertTriangle, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

interface BinData {
  _id: string;
  bin_id: string;
  level: number;
  status: "Empty" | "Half" | "Full";
  last_updated: string;
}

export default function DashboardPage() {
  const [bins, setBins] = useState<BinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (!data.authenticated) {
                router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };

  const fetchBins = async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const res = await fetch("/api/bins");
      const data = await res.json();
      if (res.ok) {
        setBins(data);
      } else {
        toast.error("Failed to fetch bin data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching bins");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

useEffect(() => {
  fetchBins();

  const interval = setInterval(() => {
    fetchBins();
  }, 5000);

  return () => clearInterval(interval);
}, []);


  const fullBinsCount = bins.filter(b => b.status === "Full").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">


  {/* Header */}
  <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold text-gray-800">
    Smart Waste Dashboard
  </h1>

  <div className="flex items-center gap-4">

    <div className="relative">
      <span className="text-xl">🔔</span>
      {bins.filter(b => b.level > 80).length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
          {bins.filter(b => b.level > 80).length}
        </span>
      )}
    </div>

    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>

  </div>

</div>


  {/* Summary Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Total Bins</h2>
      <p className="text-2xl font-bold">{bins.length}</p>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Full Bins</h2>
      <p className="text-2xl font-bold text-red-600">
        {bins.filter(b => b.level > 80).length}
      </p>
    </div>

    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-gray-500">Average Fill Level</h2>
      <p className="text-2xl font-bold text-blue-600">
        {bins.length > 0
          ? Math.round(bins.reduce((a,b)=>a+b.level,0)/bins.length)
          : 0}%
      </p>
    </div>

  </div>
  <input
  type="text"
  placeholder="Search Bin ID..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-6 px-4 py-2 border rounded-lg w-full md:w-1/3"
/>


  {/* Bin Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {bins
  .filter((bin) =>
    bin.bin_id.toLowerCase().includes(search.toLowerCase())
  )
  .map((bin) => (

      <div
        key={bin.bin_id}
        className={`p-5 rounded-xl shadow hover:scale-105 transition-transform duration-200 ${
          bin.level > 80
            ? "bg-red-100"
            : bin.level > 40
            ? "bg-yellow-100"
            : "bg-green-100"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">
          {bin.bin_id}
        </h3>

        <div className="w-full bg-gray-300 rounded-full h-4 mb-3">
          <div
            className="h-4 rounded-full"
            style={{
              width: `${bin.level}%`,
              backgroundColor:
                bin.level > 80
                  ? "red"
                  : bin.level > 40
                  ? "orange"
                  : "green",
            }}
          />
        </div>
        <BinChart bins={bins} />
        <div className="bg-white p-6 rounded-xl shadow mt-8">
  <h2 className="text-xl font-bold mb-4">Future Scope: Live Map Tracking</h2>
  <p className="text-gray-600">
    In future versions, bins will be displayed on a live map using GPS data
    to optimize waste collection routes.
  </p>
</div>


        <p className="text-gray-700">
          Fill Level: <strong>{bin.level}%</strong>
        </p>

        {bin.level > 80 && (
          <span className="inline-block mt-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm">
            🚨 Needs Immediate Collection
          </span>
        )}
      </div>
    ))}
  </div>

</div>

  );
}
