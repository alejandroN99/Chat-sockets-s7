import React from 'react';

const ChatroomPage = () => {
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
              />
            </div>
          </div>
          <button>Create Chatroom</button>
          
        </div>
      );
};

export default ChatroomPage;