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
const userToken = localStorage.getItem("CU_Token") || localStorage.getItem("G_Token");

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
      const payloadToken = userToken.split(".")[1];
      const payload = JSON.parse(atob(payloadToken));
      const userId = payload.userId;
      setUserId(userId);

      socket.on("newMessage", (message) => {
        console.log("Received newMessage:", message);

        // Actualiza el estado 'messages' aquí
        const newMessages = [...messages, message];
        console.log("New messages state:", newMessages);
        setMessage(newMessages);
      });

      socket.on("users", (users) => {
        console.log(users);
      });

      socket.emit("joinChatroom", {
        chatroomId,
        userId,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveChatroom", {
          chatroomId,
        });
      }
    };
    // eslint-disable-next-line
  }, [socket, messages, chatroomId, userToken]);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom</div>
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