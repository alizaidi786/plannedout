import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import "./Conversation.css";
export default function Conversation({ conversation, userId, profilePic }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== userId);
    // console.log("FrienID" + friendId);
    Axios.get(`http://localhost:4000/user?id=${friendId}`).then((data) => {
      console.log(data);
      if (data.data.body.status == "SUCCESS") {
        setUser(data.data.body.data);
        console.log("Friend Data" + JSON.stringify(data.data.body.data));
      } else if (data.data.body.status == "ERROR") {
        // alert("Friend Not Found");
      }
    });
  }, []);
  return (
    <div className="conversation">
      {conversation.members.length > 2 ? (
        <>
          <img
            className="conversationImg"
            src={profilePic ? profilePic : "noavtar.png"}
            alt=""
          />
          <span className="conversationName">Personal Group Chat</span>
        </>
      ) : (
        <>
          <img
            className="conversationImg"
            src={user?.profilePic ? user.profilePic : "noavtar.png"}
            alt=""
          />
          <span className="conversationName">{user?.userName}</span>
        </>
      )}
    </div>
  );
}
