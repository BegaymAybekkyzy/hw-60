import { Card } from "react-bootstrap";
import { IMessage } from "../../types";
import * as React from "react";

interface Props {
  message: IMessage;
}

const UserMessage: React.FC<Props> = ({ message }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <b>{message.author}:</b>
        <Card.Text>{message.message}</Card.Text>

        <footer className="my-0 blockquote-footer ">
          {new Date(message.datetime).toLocaleString()}
        </footer>
      </Card.Body>
    </Card>
  );
};

export default UserMessage;
