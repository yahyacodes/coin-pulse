"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface HistoryDataPoint {
  timestamp: number;
  price: number;
}

interface HistoryDataChart {
  historyData: {
    prices: HistoryDataPoint[];
  };
}

interface ChartDataPoint {
  date: string;
  price: number;
}

const chartConfig: ChartConfig = {
  price: {
    label: "Price",
  },
};

const HistoricalData: React.FC<HistoryDataChart> = ({ historyData }) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (historyData.prices) {
      const newData = historyData.prices.map((item: any) => ({
        date: new Date(item[0]).toLocaleDateString().slice(0, -5),
        price: item[1],
      }));
      setData(newData);
      console.log("Processed data:", newData);
    }
  }, [historyData]);

  return (
    <Card className="mx-auto mt-4 w-full max-w-7xl">
      <CardHeader>
        <CardTitle>Price History</CardTitle>
        <CardDescription>Last 10 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={chartConfig.price.color}
              strokeWidth={1}
              dot={{
                fill: chartConfig.price.color,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 1.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing price history for the last 10 days
        </div>
      </CardFooter>
    </Card>
  );
};

export default HistoricalData;
