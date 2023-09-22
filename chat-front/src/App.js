import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/loginPage";
import RegisterPage from "./Pages/registerPage";
import ChatroomPage from "./Pages/chatroomPage";
import IndexPage from "./Pages/indexPage";
import ChatPage from "./Pages/chatPage";
import  GoogleSignIn from "./Pages/googleLogin";
import React from "react";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = (typeToken) => {
    const token = localStorage.getItem(typeToken);
    if (token && !socket) {
      const newSocket = io("http://localhost:8080", {
        query: {
          token: localStorage.getItem(typeToken),
        },
    
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket('CU_Token');
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google" element={<GoogleSignIn setupSocket={setupSocket} />} exact />
        <Route path="/" element={<IndexPage />} exact />
        <Route
          path="/login"
          element={<LoginPage setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" element={<RegisterPage />} exact />
        <Route
          path="/chatroom"
          element={<ChatroomPage socket={socket} />}
          exact
        />
        <Route path="/chat/:id" element={<ChatPage socket={socket} />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
