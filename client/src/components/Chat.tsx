import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const Chat = () => {
  const socket = io("http://localhost:5001");
  const { search } = useLocation();
  const [params, setParams] = useState<{ [k: string]: string } | null>(null);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    console.log(params);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", (message: string) => {
      console.log(message);
    });
  }, []);

  return <div>Chat</div>;
};

export default Chat;
