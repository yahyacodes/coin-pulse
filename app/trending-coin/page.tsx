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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SkeletonCard from "@/components/skeleton-card";
import { Input } from "@/components/ui/input";

interface TrendingCoinData {
  data: any;
  coins: any;
  id: string;
  name: string;
  thumb: string;
  price_change_percentage_24h: number;
  price: number;
  price_btc: string;
  market_cap: number;
  symbol: string;
}

interface TrendingResponse {
  coins: { item: TrendingCoinData }[];
}

export default function TrendingCoin() {
  const [allTrends, setAllTrends] = useState<TrendingCoinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<TrendingCoinData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredCoins.slice(firstItemIndex, lastItemIndex);

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
      setFilteredCoins(trends);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchCryptoData();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const filtered = allTrends.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
    setCurrentPage(1);
  }, [searchTerm, allTrends]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Trending Cryptocurrencies
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-zinc-400">
          Stay ahead of the market with real-time updates on the hottest coins.
        </p>
        <div className="w-full max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Search Trending Crypto....."
            name="search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center">
        {isClient ? (
          <Card className="mt-4 w-full max-w-7xl">
            <CardHeader>
              <CardTitle>Trending</CardTitle>
              <CardDescription>
                Top 15 trending coins (sorted by the most popular user searches)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coin</TableHead>
                    <TableHead>Coin Name</TableHead>
                    <TableHead className="md:table-cell">Price</TableHead>
                    <TableHead className="md:table-cell">
                      24H Change (Btc)
                    </TableHead>
                    <TableHead className="md:table-cell">Market Cap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((trend) => (
                    <TableRow key={trend.id}>
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
                          trend.data.price_change_percentage_24h.btc > 0
                            ? "text-green-600 text-md"
                            : "text-red-600 text-md"
                        }
                      >
                        {Math.floor(
                          trend.data.price_change_percentage_24h.btc * 100
                        ) / 100}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {trend.data.market_cap}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <PaginationSection
                totalItems={filteredCoins.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </CardFooter>
          </Card>
        ) : (
          <SkeletonCard />
        )}
      </div>
    </>
  );
}

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: any;
  itemsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
