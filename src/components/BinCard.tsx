"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Trash2, BarChart2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { BinHistoryModal } from "./BinHistoryModal";
import { Button } from "./ui/button";

interface BinProps {
  bin_id: string;
  level: number;
  status: "Empty" | "Half" | "Full";
  last_updated: string;
}

export function BinCard({ bin_id, level, status, last_updated }: BinProps) {
  const [showHistory, setShowHistory] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Empty":
        return "bg-green-500 hover:bg-green-600";
      case "Half":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Full":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = (level: number) => {
    if (level > 80) return "bg-red-500";
    if (level >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="overflow-hidden border-2 transition-all hover:shadow-lg dark:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-zinc-500" />
          {bin_id}
        </CardTitle>
        <Badge className={`${getStatusColor(status)} text-white border-none`}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <span>Fill Level</span>
              <span>{level}%</span>
            </div>
            <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                <div 
                    className={`h-full transition-all duration-500 ${getProgressColor(level)}`} 
                    style={{ width: `${level}%` }}
                />
            </div>
          </div>
          
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDistanceToNow(new Date(last_updated))} ago</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                onClick={() => setShowHistory(true)}
              >
                <BarChart2 className="w-4 h-4 mr-1" />
                History
              </Button>
            </div>
          </div>
        </CardContent>
        <BinHistoryModal 
          bin_id={bin_id} 
          isOpen={showHistory} 
          onClose={() => setShowHistory(false)} 
        />
      </Card>
    );
}

