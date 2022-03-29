import * as React from "react";
import useComments from "hooks/useComments";
import { ForumComment } from "hooks/useCommentsContract";
import useEvents from "hooks/useEvents";

import CommentEditor from "components/editor";
import Comment from "./components/comment";

import { OpenWallet, useWallet } from "react-open-wallet";

interface CommentsProps {
  topic: string;
}

const Comments: React.FunctionComponent<CommentsProps> = ({ topic }) => {
  const query = useComments({ topic });
  const { account } = useWallet();
  useEvents({ topic });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {account.length === 0 && <OpenWallet />}
      {query.isLoading && (
        <div>
          <span>Cargando...</span>
        </div>
      )}
      <div style={{ minWidth: "300px", maxHeight: "500px", overflowY: "auto" }}>
        {query.data?.map((comment: ForumComment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      {query.isFetched && <CommentEditor topic={topic} />}
    </div>
  );
};

export default Comments;
