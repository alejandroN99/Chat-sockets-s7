import React from "react";
import "../Styles/chatroom.css";
import { useParams } from "react-router-dom";

const ChatPage = ({ socket }) => {
  const { id } = useParams();
  const chatroomId = id;
  console.log(chatroomId);
  const messageRef = React.createRef();
  const [messages, setMessage] = React.useState([]);
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
    }

    messageRef.current.value = "";
  };

  React.useEffect(() => {
    if (socket) {
      const token = localStorage.getItem("CU_Token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.userId);
      }

      socket.on("newMessage", (message) => {
        console.log("Received newMessage:", message);
    
        // Actualiza el estado 'messages' aquí
        const newMessages = [...messages, message];
        console.log("New messages state:", newMessages);
        setMessage(newMessages);
      });

      socket.on("users", (users) => {
        console.log(users);
      })
    }
  }, [socket, messages]);
  
  React.useEffect(() => {
    if (socket) {
      socket.emit("joinChatroom", {
        chatroomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveChatroom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
