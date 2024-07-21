import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function About() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">About CoinPulse</h1>

      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-xl font-bold">
            Real-Time Crypto Insights at Your Fingertips
          </h1>
          <p className="text-zinc-500 text-sm">Powered by CoinGecko API</p>
        </div>
        <p className="mb-4 max-w-3xl text-zinc-800">
          CoinPulse harnesses the power of{" "}
          <a href="https://www.coingecko.com/en/api" className="italic">
            CoinGecko's API
          </a>{" "}
          to deliver up-to-the-minute cryptocurrency data and analytics. Our
          mission is to empower crypto enthusiasts, investors, and traders with
          accurate, comprehensive information to make informed decisions in the
          fast-paced world of digital assets.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8 max-w-3xl text-zinc-800">
        {[
          "Live price tracking for thousands of cryptocurrencies",
          "Detailed market data, including volume, market cap, and price changes",
          "Historical data and trend analysis",
          "User-friendly interface for seamless navigation",
        ].map((feature, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <Badge className="mb-2">Feature</Badge>
              <p>{feature}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <div className="py-6 max-w-3xl text-zinc-800">
          <p className="mb-4">
            Whether you're a seasoned trader or just starting your crypto
            journey, CoinPulse provides the pulse of the market, right when you
            need it.
          </p>
          <p className="font-semibold italic">
            Stay ahead of the curve with CoinPulse – Your trusted companion in
            the crypto space.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
