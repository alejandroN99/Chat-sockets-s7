
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import ChatroomPage from './Pages/chatroomPage';
import IndexPage from './Pages/indexPage';
import ChatPage from './Pages/chatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} exact />
        <Route path="/login" element={<LoginPage />} exact/>
        <Route path="/register" element={<RegisterPage />} exact/>
        <Route path="/chatroom" element={<ChatroomPage />} exact/>
        <Route path="/chat/:id" element={<ChatPage />} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
