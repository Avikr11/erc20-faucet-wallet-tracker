import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useAccount, usePublicClient } from "wagmi";
import { parseEventLogs } from "viem";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  FAUCET_TOKEN_ADDRESS,
  FAUCET_TOKEN_ABI,
} from "@/lib/contracts/faucetToken";


type Transaction = {
  hash: string;
  amount: string;
  timestamp: number;
};


function TransactionHistory() {

  const { address } = useAccount();

  const publicClient = usePublicClient();

  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {

    async function fetchTransactions() {

      if (!address || !publicClient) return;


      try {

        const logs = await publicClient.getLogs({
          address: FAUCET_TOKEN_ADDRESS,
          fromBlock: 11200000n,
          toBlock: "latest",
        });


        console.log("ALL LOGS:", logs);


        const decodedLogs = parseEventLogs({
          abi: FAUCET_TOKEN_ABI,
          logs,
        });


        console.log("DECODED:", decodedLogs);


        const formattedTransactions: Transaction[] =
          decodedLogs
            .filter(
              (log) =>
                log.eventName === "TokensClaimed" &&
                log.args.user?.toLowerCase() === address.toLowerCase()
            )
            .map((log) => ({
              hash: log.transactionHash,

              amount: log.args.amount
                ? (Number(log.args.amount) / 10 ** 18).toString()
                : "100",

              timestamp: log.args.timestamp
                ? Number(log.args.timestamp)
                : Math.floor(Date.now() / 1000),
            }));


        setTransactions(
          formattedTransactions.reverse()
        );


      } catch (error) {

        console.error(
          "Failed loading transaction history:",
          error
        );

      }

    }


    fetchTransactions();


  }, [address, publicClient]);



  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Transaction History
        </CardTitle>

        <CardDescription>
          Your recent token claims
        </CardDescription>

      </CardHeader>


      <CardContent className="space-y-4">


        {transactions.length === 0 ? (

          <p className="text-sm text-muted-foreground">
            No claims yet. Claim your first tokens above.
          </p>

        ) : (

          transactions.map((tx) => (

            <div
              key={tx.hash}
              className="rounded-xl border p-4 space-y-3"
            >

              <div className="flex justify-between">

                <p className="font-semibold">
                  Claimed {tx.amount} FCT
                </p>


                <p className="text-xs text-muted-foreground">

                  {new Date(
                    tx.timestamp * 1000
                  ).toLocaleString()}

                </p>

              </div>


              <div className="flex justify-between items-center">

                <p className="text-sm text-muted-foreground">

                  {tx.hash.slice(0,10)}
                  ...
                  {tx.hash.slice(-8)}

                </p>


                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
                >

                  <ExternalLink className="h-4 w-4"/>

                  View

                </a>


              </div>

            </div>

          ))

        )}


      </CardContent>

    </Card>
  );
}


export default TransactionHistory;