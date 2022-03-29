import React from "react";

// PROVIDERS
import WalletProvider, { OpenWallet } from "react-open-wallet";
import { QueryClientProvider } from "react-query";
import { Provider as WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import queryClient from "providers/query";
import { providers } from "ethers";

// COMPONENTES
import Comments from "components/comments";

const provider = providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com"
);
const App: React.FC = () => {
  return (
    <WalletProvider>
      <WagmiProvider autoConnect provider={provider}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-right" />
          <Comments topic="my-blog-post" />
        </QueryClientProvider>
      </WagmiProvider>
    </WalletProvider>
  );
};

export default App;
