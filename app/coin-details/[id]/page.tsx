import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import HistoricalData from "@/components/historical-data";

async function getCoinData(id: string) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

async function getHistoryData(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=10`
  );
  if (!res.ok) return undefined;
  return res.json();
}

export default async function CoinDetails({
  params,
}: {
  params: { id: string };
}) {
  const coinData = await getCoinData(params.id);
  const historyData = await getHistoryData(params.id);

  if (!coinData && !historyData) {
    notFound();
  }

  const homepageUrl = coinData.links.homepage[0];

  return (
    <>
      <div className="container mx-auto px-4 pt-24">
        {/* <div className="flex gap-2 px-14">
          <Image
            src={coinData.image.large}
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="80"
            width="80"
          />
          <div className="mt-2">
            <h1 className="text-4xl font-bold">{coinData.name}</h1>
            <Link
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 text-sm"
            >
              {coinData.links.homepage}
            </Link>
          </div>
        </div> */}
      </div>
      <div className="mx-auto flex flex-col items-center justify-center pb-10">
        <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-2">
          <div className="col-span-1">
            <Card className="mt-4 w-full max-w-lg">
              <CardContent>
                <div className="flex gap-2 mb-10 mt-2">
                  <Image
                    src={coinData.image.large}
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="80"
                    width="80"
                  />
                  <div className="mt-2">
                    <h1 className="text-4xl font-bold">{coinData.name}</h1>
                    <Link
                      href={homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 text-sm"
                    >
                      {coinData.links.homepage}
                    </Link>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Current Price:</p>
                  <p className="flex justify-end">
                    ${coinData.market_data.current_price.usd.toLocaleString()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Market Cap:</p>
                  <p className="flex justify-end">
                    ${coinData.market_data.market_cap.usd.toLocaleString()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Fully Diluted Valuation:</p>
                  <p className="flex justify-end">
                    $
                    {coinData.market_data.fully_diluted_valuation.usd?.toLocaleString() ||
                      "N/A"}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">24h Trading Volume:</p>
                  <p className="flex justify-end">
                    ${coinData.market_data.total_volume.usd.toLocaleString()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">24h Low / 24h High:</p>
                  <p className="flex justify-end">
                    <span className="text-red-600">
                      ${coinData.market_data.low_24h.usd.toLocaleString()}
                    </span>
                    {" / "}
                    <span className="text-green-600">
                      ${coinData.market_data.high_24h.usd.toLocaleString()}
                    </span>
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">All-Time High:</p>
                  <p className="flex justify-end">
                    ${coinData.market_data.ath.usd.toLocaleString()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Circulating Supply:</p>
                  <p className="flex justify-end">
                    {coinData.market_data.circulating_supply.toLocaleString()}{" "}
                    {coinData.symbol.toUpperCase()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Total Supply:</p>
                  <p className="flex justify-end">
                    {coinData.market_data.total_supply?.toLocaleString() ||
                      "N/A"}{" "}
                    {coinData.symbol.toUpperCase()}
                  </p>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 p-2">
                  <p className="font-semibold">Max Supply:</p>
                  <p className="flex justify-end">
                    {coinData.market_data.max_supply?.toLocaleString() || "N/A"}{" "}
                    {coinData.symbol.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <HistoricalData historyData={historyData} />
          </div>
        </div>
      </div>
    </>
  );
}
