"use client";
import useModels from "@/store/useModels";
import { Chat } from "@/store/models";
import { API, ROUTING } from "@/store/config";
import { getCurrentUser } from "@/store/authService";
import { useEffect, useState } from "react";
import http from "@/store/http";
import Spinner from "@/components/Spinner";

const ChatPage = () => {
  const { data: chats, isLoading } = useModels<Chat>(API.chatbot);

  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      window.location.href = ROUTING.login;
    }
  }, [user]);

  useEffect(() => {
    // ToDo: Scroll to last chat
  }, [chats ? chats[chats.length - 1]?.id : 0]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <div>Please login to chat</div>;

  const sendMessage = async (message: string) => {
    setLoading(true);
    const chat = {
      query: message,
      userId: user.id,
      response: "",
    };
    try {
      const res = await http.post<Chat>(API.chatbot, chat);
      if (res.status === 201) {
        chats!.push(res.data);
        setMessage("");
      }
    } catch (e) {
      console.log("Something went wrong");
    }
    setLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
        maxHeight: "80vh",
        overflowY: "scroll",
      }}
    >
      {chats!.map((chat) => (
        <>
          <ChatBubble
            key={chat.id}
            name={chat.userId.toString()}
            message={chat.query}
            isSender={true}
          />
          <ChatBubble
            key={chat.id}
            name={chat.userId.toString()}
            message={chat.response}
            isSender={false}
          />
        </>
      ))}
      <div className={"flex flex-row gap-2 mt-4"}>
        <textarea
          value={message}
          className="w-full h-full textarea textarea-bordered rounded-xl"
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={"btn btn-lg btn-success mt-1"}
          onClick={() => sendMessage(message)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

interface ChatBubbleProps {
  name: string;
  message: string;
  isSender: boolean;
}

const ChatBubble = ({ name, message, isSender }: ChatBubbleProps) => {
  return (
    <div className={`chat ${isSender ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <div className="w-10 h-10 bg-green-600">
            <p className="text-lg text-center pt-1 font-bold uppercase">
              {name[0]}
            </p>
          </div>
        </div>
      </div>
      <div className="chat-header">{name}</div>
      <div className="chat-bubble pt-0">{message}</div>
    </div>
  );
};
