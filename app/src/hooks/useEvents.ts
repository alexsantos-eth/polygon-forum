import { useEffect } from "react";
import { useQueryClient } from "react-query";
import useCommentsContract, {
  EventType,
  ForumComment,
} from "./useCommentsContract";

interface UseEventsQuery {
  topic: string;
}

const useEvents = ({ topic }: UseEventsQuery) => {
  const queryClient = useQueryClient();
  const commentsContract = useCommentsContract();

  useEffect(() => {
    const handler = (comment: ForumComment) => {
      if (comment.topic !== topic) {
        return;
      }
      queryClient.invalidateQueries([
        "comments",
        { topic: comment.topic, chainId: commentsContract.chainId },
      ]);
    };

    commentsContract.contract.on(EventType.CommentAdded, handler);

    return () => {
      commentsContract.contract.off(EventType.CommentAdded, handler);
    };
  }, [queryClient, commentsContract.chainId, topic]);
};

export default useEvents;
