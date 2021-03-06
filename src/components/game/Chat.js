import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import PusherSubscription from "./Pusher";
import "../styles/Chat.css";
import MusicPlayer from "./MusicPlayer.js";
import soundfile from "../../assets/stranger_things.mp3"


const Message = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("https://space-ryders-be.herokuapp.com/api/adv/say/", { message })
      .then(res => {
        setMessage("");
      })
      .catch(err => {
        return err;
      });
  };

  const handleChange = e => {
    setMessage(e.target.value);
  };
  // console.log("Room data", props.charactersData)
  return (
    <Form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", margin: "0px" }}
    >
      <input
        style={{ fontFamily: "VT323", fontSize: "1.3rem", margin: "10px 0" }}
        name="chat"
        value={message}
        onChange={handleChange}
        type="text"
        placeholder=">>> What's the buzz?"
      />
      <Button
        style={{ backgroundColor: "purple", margin: "10px 0", border: "none" }}
        className="send-btn"
        type="submit"
      >
        Send
      </Button>
    </Form>
  );
};

function Chat({ roomId, charactersData }) {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat([]);

    axiosWithAuth().post("https://space-ryders-be.herokuapp.com/api/adv/say/", {
      message: charactersData.description
    });
  }, [charactersData.description, roomId]);

  return (
    <div className="chat-box">
      <div className="screen room-desc">
        <h5
          style={{
            textAlign: "center",
            fontSize: "1.5",
            textTransform: "uppercase"
          }}
        >
          Location: {charactersData.title}
        </h5>
      </div>
      <PusherSubscription roomId={roomId} setChat={setChat} />
      <h5 className="chat-display screen">
        <div
          style={{
            transformOrigin: "50% 50%",
            transform: "rotate(180deg)",
            scrollBehavior: "reverseScroll()"
          }}
        >
          {chat.length !== 0 &&
            chat.map((msg, i) => {
              return (
                <p key={i}>
                  <span style={{ color: "silver " }}>>>> {msg.user}: </span>{" "}
                  {msg.message}{" "}
                </p>
              );
            })}
        </div>
      </h5>
      <Message />
      <MusicPlayer url={ soundfile } />
    </div>
  );
}

export default Chat;
