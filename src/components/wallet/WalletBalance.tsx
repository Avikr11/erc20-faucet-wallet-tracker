import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";


function WalletBalance() {
  const { address } = useAccount();


  const {
    data: balance,
    isLoading,
  } = useBalance({
    address,
  });


  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            ETH Balance
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect wallet to view balance
          </p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="transition-all hover:ring-accent/40">

      <CardHeader>
        <CardTitle>
          ETH Balance
        </CardTitle>
      </CardHeader>


      <CardContent>

        {isLoading ? (
          <Skeleton className="h-8 w-28" />
        ) : (
          <p className="text-2xl font-bold">
            {balance
              ? `${Number(
                  formatEther(balance.value)
                ).toFixed(4)} ETH`
              : "0 ETH"}
          </p>
        )}

      </CardContent>

    </Card>
  );
}


export default WalletBalance;