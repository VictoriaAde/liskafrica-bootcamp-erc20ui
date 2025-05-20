import { WagmiProvider } from "wagmi";
import type { PropsWithChildren } from "react";
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "../ui/sonner"; 
import { projectId, web3Config } from "@/config/web3.config"; 

if (!projectId) throw new Error("VITE_WALLETCONNECT_PROJECT_ID is not defined");

const queryClient = new QueryClient();

export default function Web3Provider({ children }: PropsWithChildren<{}>) {
  return (
    <WagmiProvider config={web3Config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="auto"
          mode="dark"
          options={{
            embedGoogleFonts: true,
            disclaimer: (
              <>
                By connecting your wallet you agree to the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Terms_of_service"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Privacy_policy"
                >
                  Privacy Policy
                </a>
              </>
            ),
          }}
          customTheme={{
            "--ck-font-family": '"Noto Sans", serif',
            "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
            "--ck-border-radius": "24px",
          }}
        >
          <Toaster richColors />
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
