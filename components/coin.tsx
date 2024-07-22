"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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
import SkeletonCard from "./skeleton-card";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        options
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: CoinData[] = await res.json();
      setAllCoins(data);
      setFilteredCoins(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const filtered = allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
    setCurrentPage(1);
  }, [searchTerm, allCoins]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Real-Time Crypto Insights at Your Fingertips
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-zinc-400">
          CoinPulse harnesses the power of CoinGecko's API to deliver
          up-to-the-minute cryptocurrency data and analytics.
        </p>
        <div className="w-full max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Search Crypto....."
            name="search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isClient ? (
        <Card className="mt-4 w-full max-w-7xl mb-10">
          <CardHeader>
            <CardTitle>Ctypto Currency Prices By Market Cap</CardTitle>
            <CardDescription>
              Browse insights and keep track of your desired crypto currency
              price
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
                {currentItems.map((data, index) => (
                  <TableRow key={index}>
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
                      <Link href={`/coin-details/${data.id}`}>
                        {data.name + " - " + data.symbol}
                      </Link>
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
