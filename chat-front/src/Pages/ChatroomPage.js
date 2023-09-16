import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";

const ChatroomPage = () => {
  const [allChatrooms, setChatrooms] = React.useState([]);

  const getChatrooms = () => {
    axios
      .get("http://localhost:8080/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CU_Token"),
        },
      })
      .then((res) => {
        setChatrooms(res.data);
      })
      .catch((err) => {
        if (err) {
          setTimeout(getChatrooms, 3000);
        }
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  const nameRef = React.createRef();

  const createChatroom = () => {
    const name = nameRef.current.value;

    axios.post(
      "http://localhost:8080/chatroom",
      {
        name,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CU_Token"), 
        },
      }
    ).then((response) => {
      makeToast('success', response.data.msg);
      
    }).catch( (err) => {
      if (err && err.response && err.response.data && err.response.data.msg){
        makeToast("error", err.response.data.msg);
      }
    })


  };
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Chat Spain"
            ref={nameRef}
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {allChatrooms && allChatrooms.length > 0 ? (
          allChatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={`/chat/${chatroom._id}`}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))
        ) : (
          <div>No chatrooms available.</div>
        )}
      </div>
    </div>
  );
};

export default ChatroomPage;
