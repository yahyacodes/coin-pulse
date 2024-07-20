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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SkeletonCard from "./skeleton-card";

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
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = allTrends.slice(firstItemIndex, lastItemIndex);

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
    setIsClient(true);
  }, []);

  return (
    <>
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
              totalItems={allTrends.length}
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
