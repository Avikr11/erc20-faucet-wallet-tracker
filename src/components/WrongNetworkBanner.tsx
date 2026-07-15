import { useSwitchChain, useChainId } from "wagmi";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";


function WrongNetworkBanner() {
  const chainId = useChainId();

  const { switchChain, isPending } = useSwitchChain();


  const isWrongNetwork =
    chainId !== 11155111;


  if (!isWrongNetwork) {
    return null;
  }


  return (
    <div
      className="
      flex
      flex-col
      gap-4
      rounded-xl
      border
      border-destructive/30
      bg-destructive/10
      p-5
      md:flex-row
      md:items-center
      md:justify-between
      "
    >

      <div className="flex items-center gap-3">

        <AlertTriangle
          className="text-destructive"
          size={22}
        />


        <div>

          <p className="font-semibold">
            Wrong Network
          </p>

          <p className="text-sm text-muted-foreground">
            Please switch to Sepolia Testnet to use the faucet.
          </p>

        </div>

      </div>


      <Button
        onClick={() =>
          switchChain({
            chainId: 11155111,
          })
        }
        disabled={isPending}
      >

        {isPending
          ? "Switching..."
          : "Switch to Sepolia"}

      </Button>


    </div>
  );
}


export { WrongNetworkBanner };