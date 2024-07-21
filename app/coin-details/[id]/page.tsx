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
        <div className="flex gap-2 px-14">
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
      </div>
      <HistoricalData historyData={historyData} />
      <div className="mx-auto flex flex-col items-center justify-center pb-10">
        <Card className="mt-4 w-full max-w-lg">
          <CardContent>
            <div className="grid xl:grid-cols-2 md:grid-cols-1 p-4">
              <h1>Crypto Market Rank</h1>
              <p className="text-zinc-900 text-sm flex justify-end mb-2">
                {coinData.market_cap_rank}
              </p>

              <h1>Sentiment Votes UP</h1>
              <p className="text-zinc-900 text-sm flex justify-end mb-2">
                {coinData.sentiment_votes_up_percentage}
              </p>

              <h1>Sentiment Votes Down</h1>
              <p className="text-zinc-900 text-sm flex justify-end mb-2">
                {coinData.sentiment_votes_down_percentage}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
