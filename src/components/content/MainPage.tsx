import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";

interface Message {
  content: string;
}

export const MainPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");

  useEffect(() => {
    const newSocket = io("ws://localhost:3000");
    setSocket(newSocket);

    // Log the connection status
    newSocket.on("connect", () => {
      console.log("WebSocket connected");
    });
    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
    newSocket.on("connect_error", (error) => {
      console.log("WebSocket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && senderUsername && receiverUsername && socket) {
      const messageToSend = {
        senderUsername,
        receiverUsername,
        content: newMessage,
      };

      console.log("Sending message:", messageToSend);
      socket.emit("sendMessage", messageToSend);
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
      setNewMessage("");
    }
  };

  const MessageBubble = React.memo(({ message }: { message: Message }) => (
    <div className="p-2 rounded bg-gray-100 self-start">{message.content}</div>
  ));

  return (
    <main className="flex-1 border-none flex flex-col">
      <Card className="p-4 border-none flex-grow">
        <h2 className="text-md font-bold mb-2 flex justify-center items-center">
          Chat Section
        </h2>
        <div className="flex flex-col">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Sender Username"
              value={senderUsername}
              onChange={(e) => setSenderUsername(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Receiver Username"
              value={receiverUsername}
              onChange={(e) => setReceiverUsername(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
          </div>
        </div>
      </Card>
      <div className="flex items-center px-4 py-2 bg-gray-100">
        <Textarea
          placeholder="Send your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow mr-2"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </main>
  );
};
