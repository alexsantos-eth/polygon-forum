import React, { useState } from "react";
import { constants } from "ethers";
import Avatar from "@davatar/react";
import { useAccount } from "wagmi";
import useAddComment from "hooks/useAddComment";
import { useWallet } from "react-open-wallet";
import { Button, Input } from "antd";

interface CommentEditorProps {
  topic: string;
}

const CommentEditor: React.FunctionComponent<CommentEditorProps> = ({
  topic,
}) => {
  // WALLET
  const { account } = useWallet();

  // STATE
  const [message, setMessage] = useState("");

  // HOOKS
  const mutation = useAddComment();
  const [accountQuery] = useAccount();

  // MESSAGE
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  // SEND
  const sendMessage = () =>
    mutation
      .mutateAsync({
        message,
        topic,
      })
      .then(() => setMessage(""));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Avatar
          size={48}
          address={accountQuery.data?.address || constants.AddressZero}
        />
        <Input.TextArea
          rows={4}
          style={{ marginLeft: "20px" }}
          value={message}
          onChange={handleMessage}
          placeholder="Write a message.."
        />
      </div>
      {account.length !== 0 && (
        <Button
          style={{ float: "right" }}
          onClick={sendMessage}
          type="primary"
          shape="round"
          size="large"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default CommentEditor;
