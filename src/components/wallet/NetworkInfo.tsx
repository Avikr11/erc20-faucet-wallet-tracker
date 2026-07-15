import { useChainId } from "wagmi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function NetworkInfo() {
  const chainId = useChainId();


  const network =
    chainId === 11155111
      ? "Sepolia Testnet"
      : "Unknown Network";


  return (
    <Card className="transition-all hover:ring-accent/40">

      <CardHeader>
        <CardTitle>
          Network
        </CardTitle>
      </CardHeader>


      <CardContent>

        <p className="text-lg font-semibold">
          {network}
        </p>

        <p className="text-sm text-muted-foreground">
          Chain ID: {chainId}
        </p>

      </CardContent>

    </Card>
  );
}


export default NetworkInfo;