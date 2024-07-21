import { Input } from "@/components/ui/input";
import Coin from "@/components/coin";

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center ">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Real-Time Crypto Insights at Your Fingertips
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-zinc-400">
          CoinPulse harnesses the power of CoinGecko's API to deliver
          up-to-the-minute cryptocurrency data and analytics.
        </p>
        <div className="w-full max-w-md mx-auto">
          <Input type="text" placeholder="Search Crypto....." />
        </div>
      </div>
      <Coin />
    </main>
  );
}
