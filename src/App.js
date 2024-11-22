 
import './App.css';
import { Box } from "@mui/material";
 
import MainChat from './components/ChatSection/MainChat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatDetails from './components/ChatDetails/ChatDetails';
import PageConversation from './components/PostCoversation/PostConverSation';

function App() {
  return (
    
   <Router>
    <Routes>
      <Route path="/" element={<MainChat />} />
      <Route path="/chat-details" element={<ChatDetails/>} />
      <Route path="/pageConversation" element={<PageConversation/>} />
    </Routes>
  </Router>
     
  
  );
}

export default App;
