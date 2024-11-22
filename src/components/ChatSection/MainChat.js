import React from "react";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import BotAI from '../../assets/Group 1000011097.png'
import mockedData from '../../sampleData.json'
import Sidebar from "../Sidebar/Sidebar";

const MainChat = () => {


    const [userInput, setUserInput] = useState("");
    // const [chatHistory, setChatHistory] = useState([]);
    // const [isSaved, setIsSaved] = useState(false);  
     
    const navigate = useNavigate();

     
    // useEffect(() => {
    //   const savedChatHistory = JSON.parse(localStorage.getItem("chatHistory"));
    //   if (savedChatHistory) {
    //     setChatHistory(savedChatHistory);
    //   }
    // }, []);
  
    // Saving the chat history to local storage whenever it changes
    // useEffect(() => {
    //   if (isSaved && chatHistory.length > 0) {
    //     localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    //     setIsSaved(false); // Reset the  saved state
    //   }
    // }, [chatHistory, isSaved]);
  
    const handleAsk = () => {
      if (userInput.trim()) {
        
       
        const foundResponse = mockedData.find((item) =>
            item.question.toLowerCase().includes(userInput.toLowerCase())
          );
  
        const response = foundResponse ? foundResponse.response : "Sorry, I don't understand your question.";
        const id = foundResponse ? foundResponse.id : null;
        // Creating a new message object for the chat history
        const newMessage = { question: userInput, response: response, id };
        navigate("/chat-details", { state: { newMessage } });
  
        // Updating the chat history state with the new message
        // setChatHistory((prevHistory) => {
        //   const updatedHistory = [...prevHistory, newMessage];
        //   return updatedHistory;
        // });
  
        // resetting the input field
        setUserInput("");
      }
    };
  
    // const handleSave = () => {
    //   setIsSaved(true);
    //   // It will trigger the useEffect to save the chat history to local storage
    // };
   
   

  return (
    <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
         
        background: "linear-gradient(to bottom,  #9785BA33 100%)",
      }}>
    <Sidebar/>
    <Box
      sx={{
        width: { xs: "100%", sm: "80%" }, // Full width on small screens, 80% on larger screens
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
       
        minHeightheight:"100vh",
        
        background: "linear-gradient(to bottom, #D7C7F433 80%, #9785BA33 20%)",
      }}
    >
      {/* Prompt */}
      
        <Typography
        variant="h3"
        sx={{
          fontWeight: "500",
          font: "Ubuntu",
          fontSize: "30px",
           
          color: "#000000",
          marginBottom: "10px",
          marginTop: "10vw",
          textAlign: "center",
          fontSize: { xs: "20px" },
        }}
      >
        How Can I Help You Today?
      </Typography>

      {/* Icon Placeholder */}
      <Typography
        sx={{
           
          borderRadius: "50%",
          width: "130px",
          height: "140px",
          marginBottom: { xs: "10px", sm: "20px" }, // Adjust spacing for smaller screens
        }}
      >
        <img
         
          src={BotAI}
          alt="avatar"
        />
      </Typography>

      {/* Predefined Questions */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, // Single column on small screens
          gap: "20px",
          marginBottom: { xs: "10px", sm: "20px" }, // Smaller gap on smaller screens
          width: "100%",
         
         
        }}
      >
        {mockedData.map((data,id)  => (
          <Card
            key={id}
            sx={{
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
             
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  font: "Ubuntu",
                  color: "#000000",
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                }}
                onClick={()=>setUserInput(data.question)}
              >
                {data.question}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "10px",
                  fontWeight: "400",
                  font: "Open Sans",
                  backgroundColor: "#ffffff",
                  fontSize: "16px",
                }}
                color="text.secondary"
              >
                Get immediate AI-generated response
              </Typography>
            </CardContent>
          </Card>
          
        ))}
      </Box>
      
     


      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          //   flexDirection: { xs: "column", sm: "row" },
          marginTop:"30px",
          gap: "10px",
          width: "100%",
          alignItems: { xs: "stretch", sm: "center" }, 
        }}
      >
        <TextField
          placeholder="Type your question here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{
            backgroundColor: "#ffffff",
            width: "90%",
           
          }}
        />
        <Button
          onClick={handleAsk}
          sx={{
            width: {
              xs: "auto",
              sm: "auto",
             
            },
            backgroundColor: "#D7C7F4",
            fontWeight: "400",
            font: "Ubuntu",
            color: "#000000",
            fontSize: "16px",
            
          }}
        >
          Ask
        </Button>
        <Button
        
          sx={{
            width: {
              xs: "auto",
              sm: "auto",
              backgroundColor: "#D7C7F4",
              fontWeight: "400",
              font: "Ubuntu",
              color: "#000000",
              fontSize: "16px",
            },
          }}
        >
          Save
        </Button>
      </Box>
      
       
    </Box>
    </Box>
  );
};

export default MainChat;
