import React, { useEffect, useRef, useState } from "react";
import ChatOnline from "../ChatOnline/ChatOnline";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import "./Homepage.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import Axios from "../../Axios";
import { io } from "socket.io-client";
export default function Homepage() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  const UserModel = () => useStoreState((state) => state.GlobelStore.user);
  const User = UserModel();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        receiver: data.receiverId,
        username: data.username,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log(User[0]?._id);
    socket?.current.emit("addUser", User[0]?._id);
    socket?.current.on("getUsers", (user) => {
      console.log(user);
    });
  }, [User]);
  useEffect(() => {
    console.log("Id", User[0]?._id);
    Axios.get(`http://localhost:4000/conversation?id=${User[0]?._id}`).then(
      (data) => {
        // console.log(data);
        if (data.data.body.status == "SUCCESS") {
          console.log("Our Data", data.data.body.data);
          setConversations(data.data.body.data);
          // history.push("/homepage");
        } else if (data.data.body.status == "ERROR") {
          alert("Server Down");
        }
      }
    );
  }, [User[0]?._id]);
  useEffect(() => {
    Axios.get(`http://localhost:4000/user?id=${User[0]?._id}`).then(
      (data) =>{
          setUser(data.data.body.data);
      }
    );
  },[user]);
  useEffect(() => {
    Axios.get(`http://localhost:4000/messages?id=${currentChat?._id}`).then(
      (data) => {
        // console.log(data);
        if (data.data.body.status == "SUCCESS") {
          console.log("Message Data", data.data.body.data);
          setMessages(data.data.body.data);
        } else if (data.data.body.status == "ERROR") {
          // alert("Server Down");
        }
      }
    );
  }, [currentChat]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let message;
    if (currentChat?.members?.length > 2) {
      message = {
        sender: User[0]?._id,
        text: user.userName + ':' + '\r\n' + newMessage ,
        conversationId: currentChat?._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== User[0]?._id
      );
      let room = [];
      currentChat.members.map((member) => {
        if (member !== User[0]?._id) {
          // console.log("member=" + member);
          // receiverId.push(member);
        }
      });
      console.log("Memeber" + receiverId);

      socket.current.emit("sendGroupMessage", {
        senderId: User[0]?._id,
        room,
        text: user.userName + ':' + '\r\n' + newMessage,
      });
    } else {
      message = {
        sender: User[0]?._id,
        text: newMessage,
        conversationId: currentChat?._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== User[0]?._id
      );

      socket.current.emit("sendMessage", {
        senderId: User[0]?._id,
        receiverId,
        text: newMessage,
      });
    }

    Axios.put(
      `http://localhost:4000/messages?id=${currentChat?._id}`,
      message
    ).then((data) => {
      // console.log(data);
      if (data.data.body.status == "SUCCESS") {
        setMessages([...messages, data.data.body.data]);
        setNewMessage("");
      } else if (data.data.body.status == "ERROR") {
        // alert("Server Down");
      }
    });
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations?.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation
                conversation={conversation}
                userId={User[0]?._id}
                profilePic={User[0]?.profilePic}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === User[0]._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start chat
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
