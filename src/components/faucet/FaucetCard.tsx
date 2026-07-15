import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  FAUCET_TOKEN_ADDRESS,
  FAUCET_TOKEN_ABI,
} from "@/lib/contracts/faucetToken";


function formatCooldown(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${h}h ${m}m ${s}s`;
}


function FaucetCard() {
  const { address, isConnected } = useAccount();

  const [cooldown, setCooldown] = useState(0);


  const {
    data: nextClaimSeconds,
    refetch: refetchCooldown,
  } = useReadContract({
    address: FAUCET_TOKEN_ADDRESS,
    abi: FAUCET_TOKEN_ABI,
    functionName: "timeUntilNextClaim",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });


  const {
    writeContract,
    data: hash,
    isPending,
    error,
  } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });


  useEffect(() => {
    if (nextClaimSeconds !== undefined) {
      setCooldown(Number(nextClaimSeconds));
    }
  }, [nextClaimSeconds]);


  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);

  }, [cooldown]);


  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Tokens claimed successfully! 100 FCT added to your wallet."
      );

      refetchCooldown();
    }
  }, [isSuccess, refetchCooldown]);


  useEffect(() => {
    if (error) {
      toast.error(
        error.message.includes("cooldown")
          ? "Claim cooldown still active"
          : "Claim failed. Try again."
      );
    }
  }, [error]);


  function handleClaim() {
  if (!address) return;

  writeContract({
    address: FAUCET_TOKEN_ADDRESS,
    abi: FAUCET_TOKEN_ABI,
    functionName: "claim",
    account: address,
    chain: {
      id: 11155111,
      name: "Sepolia",
      nativeCurrency: {
        name: "Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["https://rpc.sepolia.org"],
        },
      },
    },
  });
}
  const isBusy = isPending || isConfirming;

  const canClaim =
    isConnected &&
    cooldown <= 0 &&
    !isBusy;


  return (
    <Card className="ring-1 ring-accent/20 transition-all duration-200 hover:ring-accent/40 hover:shadow-lg hover:shadow-accent/5">

      <CardHeader>
        <CardTitle>
          Claim Test Tokens
        </CardTitle>

        <CardDescription>
          Get 100 FCT tokens every 24 hours to test your dApp.
        </CardDescription>
      </CardHeader>


      <CardContent className="space-y-4">

        <Button
          onClick={handleClaim}
          disabled={!canClaim}
          className="w-full"
        >
          {!isConnected
            ? "Connect wallet to claim"
            : isPending
            ? "Confirm in wallet..."
            : isConfirming
            ? "Claiming..."
            : cooldown > 0
            ? `Next claim in ${formatCooldown(cooldown)}`
            : "Claim 100 FCT"}
        </Button>


        {hash && (
          <div className="rounded-lg bg-muted p-3 text-sm">

            <p className="font-semibold">
              Transaction Submitted
            </p>

            <p className="mt-1 break-all text-xs text-muted-foreground">
              {hash}
            </p>

            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-accent hover:underline"
            >
              View on Etherscan →
            </a>

          </div>
        )}

      </CardContent>

    </Card>
  );
}


export default FaucetCard;