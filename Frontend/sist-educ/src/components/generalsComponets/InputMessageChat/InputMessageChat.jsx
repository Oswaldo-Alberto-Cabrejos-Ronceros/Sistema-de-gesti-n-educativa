import React from "react";
import "./InputMessageChat.css";
import { BsEmojiSmile } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";

function InputMessageChat() {
  return (
    <div className="InputMessageChatContainer">
      <div className="InputMessageChatLeftContainer">
        <BsEmojiSmile className="InputMessageChatIcon"/>
      </div>
      <div className="InputMessageChatCenterContainer">
        <input type="text" id="message" name="message" placeholder="Escribe un mensaje"/>
      </div>
      <div className="InputMessageChatRightContainer">
        <VscSend className="InputMessageChatIcon"/>
      </div>
    </div>
  );
}

export default InputMessageChat;
