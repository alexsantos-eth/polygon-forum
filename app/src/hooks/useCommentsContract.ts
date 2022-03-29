import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";

import type { BigNumber } from "ethers";
import CommentsContract from "contracts/Commets.json";

export interface ForumComment {
  id: string;
  topic: string;
  message: string;
  creator_address: string;
  created_at: BigNumber;
}

export enum EventType {
  CommentAdded = "CommentAdded",
}

const useCommentsContract = () => {
  const [signer] = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    addressOrName: "0xA70600652D9B583Eb5Cc0B25BB9dFdd3a88bF6B4",
    contractInterface: CommentsContract.abi,
    signerOrProvider: signer.data || provider,
  });

  const getComments = async (topic: string): Promise<ForumComment[]> => {
    return contract.getComments(topic).then((comments: ForumComment[]) => {
      return comments.map((c) => ({ ...c }));
    });
  };

  const addComment = async (topic: string, message: string): Promise<void> => {
    const tx = await contract.addComment(topic, message);
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getComments,
    addComment,
  };
};

export default useCommentsContract;
