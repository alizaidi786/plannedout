import React from "react";
import "./ChatOnline.css";
export default function ChatOnline() {
  return (
    <div className="chatOnline">
      {/* {onlineFriends.map((o) => ( */}
      <div
        className="chatOnlineFriend"
        //  onClick={() => handleClick(o)}
      >
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="d.jpg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">
          Abdulla
          {/* {o?.username} */}
        </span>
      </div>
      {/* ))} */}
    </div>
  );
}
