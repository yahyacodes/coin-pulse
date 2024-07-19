import Coin from "@/components/coin";
import TrendingCoin from "@/components/trendingCoin";

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center ">
      <TrendingCoin />
      <Coin />
    </main>
  );
}
