"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Activity,
  CheckCircle,
  Clock,
  Database,
  Server,
  CpuIcon,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AnimatedText from "@/components/animated-text";
import { Progress } from "@/components/ui/progress";

interface SystemStatus {
  apiStatus: "operational" | "degraded" | "down";
  oddsApiCalls: number;
  oddsApiLimit: number;
  oddsApiNextReset: string;
  aiCalls: number;
  aiLimit: number;
  lastUpdate: string;
  currentLoad: number;
  databaseStatus: "operational" | "degraded" | "down";
  predictionCount: number;
}

export default function SystemStatus() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SystemStatus>({
    apiStatus: "operational",
    oddsApiCalls: 135,
    oddsApiLimit: 500,
    oddsApiNextReset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    aiCalls: 87,
    aiLimit: 100,
    lastUpdate: new Date().toISOString(),
    currentLoad: 28,
    databaseStatus: "operational",
    predictionCount: 328,
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const refreshStatus = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Update with slightly changed mock data to simulate changes
      setStatus((prev) => ({
        ...prev,
        oddsApiCalls: prev.oddsApiCalls + Math.floor(Math.random() * 3),
        aiCalls: Math.min(
          prev.aiLimit,
          prev.aiCalls + Math.floor(Math.random() * 2)
        ),
        lastUpdate: new Date().toISOString(),
        currentLoad: Math.floor(Math.random() * 40) + 10,
        predictionCount: prev.predictionCount + Math.floor(Math.random() * 5),
      }));

      setLoading(false);
    }, 500);
  };

  // Format date
  const formatDate = (
    dateString: string,
    format: "time" | "datetime" = "time"
  ): string => {
    const date = new Date(dateString);
    if (format === "time") {
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } else {
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Get status badge
  const getStatusBadge = (status: "operational" | "degraded" | "down") => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Operational
          </Badge>
        );
      case "degraded":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Degraded
          </Badge>
        );
      case "down":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Down
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 border-b border-gray-200 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <AnimatedText text="System Status" element="span" />
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-normal">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <AnimatedText
                  text={`Last updated: ${formatDate(status.lastUpdate)}`}
                  element="span"
                />
              </div>
            </Badge>
            <button
              onClick={refreshStatus}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">The Odds API</div>
              {getStatusBadge(status.apiStatus)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Rate Limit Usage</span>
                <span className="text-gray-700 font-medium">
                  {status.oddsApiCalls} / {status.oddsApiLimit}
                </span>
              </div>
              <Progress
                value={(status.oddsApiCalls / status.oddsApiLimit) * 100}
              />
            </div>
            <div className="text-xs text-gray-500">
              Resets: {formatDate(status.oddsApiNextReset, "datetime")}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">AI Processing</div>
              {getStatusBadge("operational")}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">AI Calls Today</span>
                <span className="text-gray-700 font-medium">
                  {status.aiCalls} / {status.aiLimit}
                </span>
              </div>
              <Progress value={(status.aiCalls / status.aiLimit) * 100} />
            </div>
            <div className="text-xs text-gray-500">
              Server Load: {status.currentLoad}%
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Database</div>
              {getStatusBadge(status.databaseStatus)}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Total Predictions</span>
              <span className="text-gray-700 font-medium">
                {status.predictionCount}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Status</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
