"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Bin {
  bin_id: string;
  level: number;
}

export default function BinChart({ bins }: { bins: Bin[] }) {
  if (!bins || bins.length === 0) {
    return null;
  }

  const data = {
    labels: bins.map((b) => b.bin_id),
    datasets: [
      {
        label: "Fill Level (%)",
        data: bins.map((b) => b.level),
        backgroundColor: bins.map((b) =>
          b.level > 80 ? "#ef4444" : b.level > 40 ? "#f59e0b" : "#22c55e"
        ),
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        📊 Bin Fill Level Analytics
      </h2>
      <div className="h-48">
  <Bar
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
</div>

    </div>
  );
}