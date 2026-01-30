"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface HistoryItem {
  level: number;
  timestamp: string;
}

interface BinHistoryModalProps {
  bin_id: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BinHistoryModal({ bin_id, isOpen, onClose }: BinHistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/bins/${bin_id}`);
          const data = await res.json();
          if (res.ok) {
            setHistory(data.history || []);
          }
        } catch (error) {
          console.error("Failed to fetch history", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [bin_id, isOpen]);

  const chartData = history.map((item) => ({
    time: format(new Date(item.timestamp), "HH:mm"),
    level: item.level,
  })).slice(-10); // Show last 10 readings

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Analytics: {bin_id}</DialogTitle>
          <DialogDescription>
            Historical fill level data for the last 10 updates.
          </DialogDescription>
        </DialogHeader>

        <div className="h-[300px] w-full mt-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-white" />
            </div>
          ) : history.length === 0 ? (
            <div className="flex h-full items-center justify-center text-zinc-500">
              No historical data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis 
                  dataKey="time" 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
