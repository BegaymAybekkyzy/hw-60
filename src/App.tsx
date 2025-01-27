import './App.css';
import UserMessage from './components/UserMessage/UserMessage.tsx';
import { useEffect, useState } from 'react';
import { IMessage } from './types';


const url = "http://146.185.154.90:8000/messages";
const App = () => {
const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const messageData = await response.json();

      setAllMessages(prevState => [...prevState, ...messageData]);
      console.log(messageData);
    };

    fetchData().catch(e => console.error(e));
  }, []);

  return (
    <>
      <div className="container">
        <div className="py-5">
          {allMessages.length > 0 ? (
            allMessages.map((message) => (
              <UserMessage key={message._id} message={message} />
            ))
          ) : (
            <div>No messages</div>
          )}
        </div>
      </div>

    </>);
};

export default App;
