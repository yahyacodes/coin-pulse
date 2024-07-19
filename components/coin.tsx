"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CoinData {
  id: number;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
}

export default function Coin() {
  const [allCoins, setAllCoins] = useState<CoinData[]>([]);

  const fetchCryptoData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-FG4rRMJywMmbCskPXr512i98",
      },
    };

    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        options
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: CoinData[] = await res.json();
      setAllCoins(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <Card className="mt-4 w-full max-w-7xl">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                #
              </TableHead>
              <TableHead>Coin</TableHead>
              <TableHead>Coin Name</TableHead>
              <TableHead className="md:table-cell">Price</TableHead>
              <TableHead className="md:table-cell">24H Change</TableHead>
              <TableHead className="md:table-cell">Market Cap</TableHead>
              <TableHead>
                <span className="">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCoins.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="hidden md:table-cell">
                  {data.market_cap_rank}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="30"
                    src={data.image}
                    width="30"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {data.name + " - " + data.symbol}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${data.current_price.toLocaleString()}
                </TableCell>
                <TableCell
                  className={
                    data.price_change_percentage_24h > 0
                      ? "text-green-600 text-md"
                      : "text-red-600 text-md"
                  }
                >
                  {Math.floor(data.price_change_percentage_24h * 100) / 100}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${data.market_cap.toLocaleString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${data.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
