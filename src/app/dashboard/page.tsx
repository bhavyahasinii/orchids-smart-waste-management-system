"use client";

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
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    window.location.href = "/login";
  }
}, []);

  const fullBinsCount = bins.filter(b => b.status === "Full").length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <Trash2 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SmartWaste Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => fetchBins()} disabled={refreshing}>
              <RefreshCcw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border-2 bg-white p-6 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Bins</p>
              <p className="text-2xl font-bold">{bins.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border-2 bg-white p-6 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Full Bins (Alerts)</p>
              <p className="text-2xl font-bold text-red-600">{fullBinsCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border-2 bg-white p-6 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
              <RefreshCcw className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
          </div>
        </div>

        {/* Bins Grid */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Live Bin Monitoring</h2>
            <div className="flex gap-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Empty</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Half</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Full</span>
            </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-white" />
          </div>
        ) : bins.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white dark:bg-zinc-900">
            <Trash2 className="mb-4 h-12 w-12 text-zinc-300" />
            <p className="text-zinc-500">No bins found. Send data to start monitoring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bins.map((bin) => (
              <BinCard
                key={bin._id}
                bin_id={bin.bin_id}
                level={bin.level}
                status={bin.status}
                last_updated={bin.last_updated}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
