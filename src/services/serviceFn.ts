import { Contract } from "ethers";
import { ensureEthereumAvailable, getERC20Contract } from ".";
import { handleErrorMessage } from "@/lib/utils";

export const getName = async () => {
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getERC20Contract();
        const name: string = await contract.name();

        return name;
    } catch(error) {
        handleErrorMessage(error);
        throw error;
    }
}

export const transfer = async (to: string, amount: string) => {
    await ensureEthereumAvailable();

    try {
        const contract: Contract = await getERC20Contract();
        const tx = await contract.transfer(to, amount);
        await tx.wait();

        return tx;
    } catch(error) {
        handleErrorMessage(error);
        throw error;
    }
}