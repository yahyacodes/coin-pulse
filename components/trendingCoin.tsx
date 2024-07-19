"use client";

import React, { useState, useEffect } from "react";
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

interface TrendingCoinData {
  data: any;
  coins: any;
  id: string;
  name: string;
  thumb: string;
  price_change_percentage_24h: {
    aed: number;
    ars: number;
    aud: number;
    bch: number;
    bdt: number;
    bhd: number;
    bmd: number;
    bnb: number;
    brl: number;
    btc: number;
    cad: number;
    chf: number;
    clp: number;
    cny: number;
    czk: number;
    dkk: number;
    dot: number;
    eos: number;
    eth: number;
    eur: number;
    gbp: number;
    gel: number;
    hkd: number;
    huf: number;
    idr: number;
    ils: number;
    inr: number;
    jpy: number;
    krw: number;
    kwd: number;
    lkr: number;
    ltc: number;
    mmk: number;
    mxn: number;
    myr: number;
    ngn: number;
    nok: number;
    nzd: number;
    php: number;
    pkr: number;
    pln: number;
    rub: number;
    sar: number;
    sek: number;
    sgd: number;
    thb: number;
    try: number;
    twd: number;
    uah: number;
    usd: number;
    vef: number;
    vnd: number;
    xag: number;
    xau: number;
    xdr: number;
    xlm: number;
    xrp: number;
    yfi: number;
    zar: number;
    bits: number;
    link: number;
    sats: number;
  };
  price: number;
  market_cap: number;
  symbol: string;
}

interface TrendingResponse {
  coins: { item: TrendingCoinData }[];
}

export default function TrendingCoin() {
  const [allTrends, setAllTrends] = useState<TrendingCoinData[]>([]);

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
        "https://api.coingecko.com/api/v3/search/trending?vs_currency=usd",
        options
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: TrendingResponse = await res.json();
      const trends = data.coins.map((trend) => trend.item);
      setAllTrends(trends);
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
            {allTrends.map((trend) => (
              <TableRow key={trend.id}>
                <TableCell className="hidden md:table-cell">
                  {trend.market_cap}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="30"
                    src={trend.thumb}
                    width="30"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {trend.name + " - " + trend.symbol}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${trend.data.price.toLocaleString()}
                </TableCell>
                <TableCell
                  className={
                    trend.data.price_change_percentage_24h > 0
                      ? "text-green-600 text-md"
                      : "text-red-600 text-md"
                  }
                >
                  {Math.floor(trend.data.price_change_percentage_24h * 100) /
                    100}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {trend.data.market_cap}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${trend.market_cap}
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
