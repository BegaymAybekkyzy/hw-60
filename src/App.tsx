import UserMessage from "./components/UserMessage/UserMessage.tsx";
import { useEffect, useState } from "react";
import { IMessage, IUserMessage } from "./types";
import MessagingForm from "./components/MessagingForm/MessagingForm.tsx";

const url = "http://146.185.154.90:8000/messages";
const App = () => {
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const messageData: IMessage[] = await response.json();
      setAllMessages(messageData);

      if (messageData.length > 0) {
        setLastMessageDate(messageData[messageData.length - 1].datetime);
      }
    };

    fetchData().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!lastMessageDate) return;

    const interval = setInterval(async () => {
      const response = await fetch(url + "?datetime=" + lastMessageDate);
      if (response.ok) {
        const messageData: IMessage[] = await response.json();

        if (messageData.length > 0) {
          setAllMessages((prevState) => [...prevState, ...messageData]);
          setLastMessageDate(messageData[messageData.length - 1].datetime);
        }
      } else throw new Error(response.statusText);
    }, 3000);

    return () => clearInterval(interval);
  }, [lastMessageDate]);

  const messageSending = async (message: IUserMessage) => {
    const postData = new URLSearchParams();
    postData.set("message", message.message);
    postData.set("author", message.author);

    const response = await fetch(url, {
      method: "POST",
      body: postData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  };

  return (
    <>
      <div className="">
        <div className="container py-3">
          <MessagingForm messageSending={messageSending} />
        </div>
        <hr />
        <div className="container py-3">
          {allMessages.length > 0 ? (
            allMessages.map((message) => (
              <UserMessage key={message._id} message={message} />
            ))
          ) : (
            <div className="text-center">No messages</div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
