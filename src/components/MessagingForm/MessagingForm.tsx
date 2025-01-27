import { Button, Form } from "react-bootstrap";
import * as React from "react";
import { useState } from "react";
import { IUserMessage } from "../../types";

interface Props {
  messageSending: (message: IUserMessage) => void;
}

const MessagingForm: React.FC<Props> = ({ messageSending }) => {
  const [user, setUser] = useState<IUserMessage>({
    author: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    messageSending(user);

    setUser({
      author: "",
      message: "",
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(event) => setUser({ ...user, author: event.target.value })}
          type="text"
          value={user.author}
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control
          onChange={(event) =>
            setUser({ ...user, message: event.target.value })
          }
          value={user.message}
          placeholder="Enter a message"
          as="textarea"
          rows={3}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MessagingForm;
