import * as React from "react";
import TimeAgo from "react-timeago";
import Avatar from "@davatar/react";

import { ForumComment } from "hooks/useCommentsContract";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Card } from "antd";

interface CommentProps {
  comment: ForumComment;
}

const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
  return (
    <div>
      <Card bordered={false} style={{ width: 300, background: "#22303C" }}>
        <Card.Meta
          avatar={<Avatar size={48} address={comment.creator_address} />}
          title={
            <p style={{ color: "#fff" }}>
              {truncateMiddle(comment.creator_address || "", 5, 4, "...")}
            </p>
          }
          description={
            <TimeAgo
              style={{ color: "#fff" }}
              date={comment.created_at.toNumber() * 1000}
            />
          }
        />
        <br />
        <p style={{ color: "#fff" }}>{comment.message}</p>
      </Card>
      <hr />
    </div>
  );
};

export default Comment;
