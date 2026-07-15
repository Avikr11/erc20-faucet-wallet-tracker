import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
} from "wagmi";

import { formatEther, formatUnits } from "viem";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import {
  FAUCET_TOKEN_ADDRESS,
  FAUCET_TOKEN_ABI,
} from "@/lib/contracts/faucetToken";


function StatsGrid() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading: balanceLoading } =
    useBalance({
      address,
    });


  const { data: tokenBalance, isLoading: tokenLoading } =
    useReadContract({
      address: FAUCET_TOKEN_ADDRESS,
      abi: FAUCET_TOKEN_ABI,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
      query: {
        enabled: !!address,
      },
    });


  const chainId = useChainId();


  function copyAddress() {
    if (!address) return;

    navigator.clipboard.writeText(address);

    toast.success("Wallet address copied");
  }


  if (!isConnected) {
    return (
      <Card className="flex flex-col items-center justify-center py-12 text-center">
        <CardContent>
          <p className="text-lg font-semibold">
            No wallet connected
          </p>

          <p className="text-sm text-muted-foreground">
            Connect your wallet to view balances and claim tokens.
          </p>
        </CardContent>
      </Card>
    );
  }


  const stats = [
    {
      title: "Wallet",
      value: (
        <div className="flex items-center gap-2">
          <span>
            {address?.slice(0, 6)}...
            {address?.slice(-4)}
          </span>

          <button
            onClick={copyAddress}
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy size={16}/>
          </button>

          <a
            href={`https://sepolia.etherscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink size={16}/>
          </a>
        </div>
      ),
      loading:false,
      accent:true,
    },


    {
      title:"ETH Balance",
      value: balance
        ? `${Number(formatEther(balance.value)).toFixed(4)} ETH`
        : "--",
      loading:balanceLoading,
      accent:false,
    },


    {
      title:"Token Balance",
      value:
        tokenBalance !== undefined
        ? `${Number(
            formatUnits(tokenBalance as bigint,18)
          ).toLocaleString()} FCT`
        : "--",
      loading:tokenLoading,
      accent:false,
    },


    {
      title:"Network",
      value:
        chainId === 11155111
        ? "Sepolia"
        : "Unknown",
      loading:false,
      accent:
        chainId === 11155111,
    },
  ];


  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat)=>(

        <Card
          key={stat.title}
          className="
          transition-all
          duration-200
          hover:-translate-y-1
          hover:ring-accent/40
          hover:shadow-lg
          "
        >

          <CardHeader>

            <CardTitle className="flex items-center gap-2 text-muted-foreground">

              {stat.title}

              {stat.accent && (
                <span className="
                h-1.5
                w-1.5
                rounded-full
                bg-success
                animate-pulse
                "/>
              )}

            </CardTitle>

          </CardHeader>


          <CardContent>

            {stat.loading ? (

              <Skeleton className="h-8 w-24"/>

            ) : (

              <p className="text-xl font-bold">
                {stat.value}
              </p>

            )}

          </CardContent>

        </Card>

      ))}

    </div>

  );
}


export default StatsGrid;