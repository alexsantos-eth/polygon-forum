import { QueryClient, QueryCache } from "react-query";
import { toast } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

export default queryClient;
