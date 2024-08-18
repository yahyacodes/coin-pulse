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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
          CoinPulse harnesses the power of{" "}
          <Link href="https://www.coingecko.com/" target="_blank">
            CoinGecko's API
          </Link>{" "}
          to deliver up-to-the-minute cryptocurrency data and analytics.
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
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    24H Change
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Market Cap
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
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-zinc-100 animate-spin fill-zinc-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
            {/* <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink> */}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
