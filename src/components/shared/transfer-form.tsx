import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { transfer } from "@/services/serviceFn";

export default function TransferForm() {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setIsLoading(true);
    toast.loading("Transferring...");

    try {
        const amountInWei = (parseFloat(amount) * 1e18).toString();
        await transfer(recipient, amountInWei);

        toast.success("Transfer successful");

        setRecipient("");
        setAmount("");
    } catch(error) {
        toast.error("Transfer failed");
        console.error("Transfer error:", error);

    } finally {
        setIsLoading(false);
        toast.dismiss();
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-card rounded-lg border">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Transfer Tokens</h3>
        <p className="text-sm text-muted-foreground">
          Send tokens to another address
        </p>
      </div>
,
      <div className="space-y-2">
        <Input
          type="text"
          placeholder=""
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.000000000000000001"
          min="0"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Transferring..." : "Transfer"}
      </Button>
    </form>
  );
}
