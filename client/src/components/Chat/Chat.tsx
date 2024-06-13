import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";
import io from "socket.io-client";
import "./style.scss";

export const Chat = () => {
  const socket = io("http://localhost:5001");
  const { search } = useLocation();
  const [params, setParams] = useState<{ [k: string]: string } | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    console.log(params);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
      console.log(message);
    });
  }, []);

  return (
    <Container className="chatPage">
      <Box className="chat">
        <Box className="chat__sidebar">
          <Box className="chat__sidebar-header">
            <Box className="chat__sidebar-header-left">
              <Box className="chat__sidebar-info">
                <h3>{params ? params.room : ""}</h3>
                <p>users: </p>
              </Box>
            </Box>
            <Box className="chat__sidebar-header-right">
              <Box className="chat__sidebar-search">
                <TextField
                  type="text"
                  margin="normal"
                  id="search"
                  label="search"
                  name="search"
                  autoComplete="off"
                  autoFocus
                  color="secondary"
                />
              </Box>
            </Box>
          </Box>
          <Box className="chat__sidebar-chats">
            <Box className="chat__sidebar-chat">
              <Box className="chat__sidebar-chat-avatar">
                <img
                  src="https://avatars.dicebear.com/api/human/1.svg"
                  alt="avatar"
                />
              </Box>
              <Box className="chat__sidebar-chat-info">
                <h2>Room Name</h2>
                <p>This is the last message</p>
              </Box>
              <Box className="chat__sidebar-chat-timestamp">
                <p>timestamp</p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="chat__body">
          <Box className="chat__body-header">
            <Box className="chat__body-header-info">
              <h2>Room Name</h2>
              <p>last seen at...</p>
            </Box>
            <Box className="chat__body-header-right">
              <Box className="chat__body-search">
                <TextField
                  type="text"
                  margin="normal"
                  id="searchMessage"
                  label="search message"
                  name="search message"
                  autoComplete="off"
                  autoFocus
                  color="secondary"
                  className="chat__body-search-input"
                />
              </Box>
            </Box>
          </Box>
          <Box className="chat__body-messages">
            <Box className="chat__body-message">
              <Box className="chat__body-message-avatar">
                <img
                  src="https://avatars.dicebear.com/api/human/1.svg"
                  alt="avatar"
                />
              </Box>
              <Box className="chat__body-message-info">
                <h4>name</h4>
                <p>message</p>
              </Box>
              <Box className="chat__body-message-timestamp">
                <p>timestamp</p>
              </Box>
            </Box>
          </Box>
          <Box className="chat__body-footer">
            <TextField
              type="text"
              margin="normal"
              id="message"
              label="your message"
              name="message"
              autoComplete="off"
              autoFocus
              color="secondary"
              className="chat__body-message-input"
              multiline
              fullWidth
            />
            <Button variant="contained">submit</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
