import { Contract } from "ethers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getERC20Contract } from "@/services";
import Wrapper from "@/components/shared/wrapper";
import { getName } from "@/services/serviceFn";
import { truncateAddr } from "@/lib/utils";
import TransferForm from "@/components/shared/transfer-form";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

export default function RootPage() {
  const { isConnected, address } = useAccount();
  const [tokenName, setTokenName] = useState<string>("");
  const [contract, setContract] = useState<Contract | null>(null);

  const {
    fn: getNameFn,
    data: name,
    isLoading: isFetchingName,
  } = useFetch(getName);

  useEffect(() => {
    getNameFn();
  }, [getNameFn, address]);

  useEffect(() => {
    if (name) {
      setTokenName(name);
    }
  }, [name]);

  // initialise contract
  useEffect(() => {
    const initContract = async () => {
      const contractInstance: Contract = await getERC20Contract();
      setContract(contractInstance);
    };

    initContract();
  }, []);

  return (
    <Wrapper className="flex flex-col w-full h-[calc(100%-80px)] py-10 relative">
      {isConnected ? (
        <div className="mx-auto max-w-3xl size-full flex flex-col gap-8 flex-1">
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-normal text-white">
                👋 Welcome, {truncateAddr(address)}
              </h1>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Token Name: {isFetchingName ? "Loading..." : tokenName}
              </p>
            </div>
          </div>
          <TransferForm />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3">
        <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-blue-500 z-50" />
        <p className="text-lg font-normal text-blue-500">
          No account connected
        </p>
      </div>
      )}
    </Wrapper>
  );
}
