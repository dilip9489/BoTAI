 
 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
   
  Rating,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import Sidebar from '../Sidebar/Sidebar';
import mockedData from '../../sampleData.json'
import Img from '../../assets/Group 1000011096.png'
import BotAI from '../../assets/Group 1000011097.png'
import tipsImg from '../../assets/image 34.png'
const currentDate = new Date();
const hours = currentDate.getHours(); 
const minutes = currentDate.getMinutes();  
const seconds = currentDate.getSeconds();  
const period = hours >= 12 ? 'PM' : 'AM';


const getTime = ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;


const ChatDetails = () => {

    
  const location = useLocation();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [ratings, setRatings] = useState({});
  const [state,setState]=useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [storedFeedback, setStoredFeedback] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);
  // Retrieve saved ratings from localStorage
  console.log(chatHistory)
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};

    const savedFeedback = JSON.parse(localStorage.getItem("feedback")) || {};
    
    setRatings(savedRatings);
    setStoredFeedback(savedFeedback);
  }, []);

   
  const handleRatingChange = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const openFeedbackModal = (id) => {
    setCurrentChatId(id);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsModalOpen(false);
    setFeedback("");
  };

  const submitFeedback = (id, feedback) => {
    setStoredFeedback((prev) => ({ ...prev, [currentChatId]: feedback })); 
    setFeedback("");  
   closeFeedbackModal();
  };
  // Get the new message passed from MainChat
  useEffect(() => {
    if (location.state?.newMessage) {
      setChatHistory([location.state.newMessage]);
    //   console.log([location.state.newMessage]) // Only show the new message initially
    }
  }, [location.state]);

  const handleSave = () => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    localStorage.setItem(
      "chatHistory",
      JSON.stringify([...savedHistory, ...chatHistory])
    );
    localStorage.setItem("ratings", JSON.stringify(ratings));
    localStorage.setItem("feedback", JSON.stringify(storedFeedback));
    alert("Chat history, ratings, and feedback saved!");
  };

  const handleAsk = () => {
    if (userInput.trim()) {
        const foundResponse = mockedData.find((item) =>
            item.question.toLowerCase().includes(userInput.toLowerCase())
          );
          const response = foundResponse ? foundResponse.response : "Sorry, I don't understand your question.";
          const id = foundResponse ? foundResponse.id : null; // Handle case where no match is found
          
          const newChat = {
            id, 
              question: userInput, 
              response, 
             
          };
        setChatHistory((prev) => [...prev, newChat]);
        setUserInput("");
         
    }
  };
  const handleClick=()=>{
    setState(true)
  }

  return (
    <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
        
        background: "linear-gradient(to bottom,  #9785BA33 100%)",
      }}>
    <Sidebar/>
    <Box sx={{
        width: { xs: "100%", sm: "80%" }, // Full width on small screens, 80% on larger screens
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
       
        minHeightheight:"100vh",
        
        background: "linear-gradient(to bottom, #D7C7F433 80%, #9785BA33 20%)",
      }}>
      {/* Chat History UI */}
       
      <Box>
        {chatHistory.map((chat) => (
            <Box>
          <Card key={chat.id} sx={{marginBottom:"30px",background:"#D7C7F421"}}>
            <CardContent>
                <Box sx={{display:"flex",justifyContent:"flex-start", alignItems:"center",  }}>
                <Typography sx={{width:"70px", height:"70px", borderRadius:"50%"}}><img src={Img} alt="AvatarImage"/></Typography>
                
               <Box sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start", marginLeft:"10px",  marginBottom:"20px", textAlign:"left"}}>
               <Typography variant="h6" sx={{ fontWeight: "700",font: "Ubuntu", fontSize: "16px",color: "#000000",}}>You</Typography>
               <Typography>{chat.question}</Typography>
               <Typography sx={{color:"#0000009E",marginTop:"10px",font: "Open Sans", fontSize: "15px",fontWeight: "700"}}>{getTime}</Typography>
               </Box>
                </Box>
             </CardContent>
            </Card>
            <Card key={chat.id} sx={{marginBottom:"30px",background:"#D7C7F421",  position: "relative","&:hover .thumbs-icon": {visibility: "visible",
      opacity: 1,
    },}}>
            <CardContent>
                <Box sx={{display:"flex",justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{width:"70px", height:"70px", borderRadius:"50%"}}><img src={BotAI} alt="AvatarImage"/></Typography>
                <Box sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start",marginLeft:"10px",   marginBottom:"20px", textAlign:"left"}}>
               <Typography variant="h6" sx={{ fontWeight: "700",font: "Ubuntu", fontSize: "16px",color: "#000000",}}>BoTAI</Typography>
               <Typography>{chat.response}</Typography>
               {state && (<Rating
                          value={ratings[chat.id] || 0}
                          onChange={(e, value) => handleRatingChange(chat.id, value)}
                        />
                    )
                }
                {storedFeedback[chat.id] && (
              <Typography sx={{ marginTop: "10px",  }}>
               Feedback: {storedFeedback[chat.id]}
              </Typography>
               )}
               <Box sx={{display:"flex", justifyContent:"flex-start",gap:"15px", marginLeft:"10px", alignItems:"center", marginTop:"10px"}}>
               <Typography sx={{color:"#0000009E", font: "Open Sans", fontSize: "15px",fontWeight: "700"}}>{getTime}</Typography>
               <Typography className="thumbs-icon" sx={{cursor:"pointer",color:"grey",visibility: "hidden",transition: "opacity 0.3s ease-in-out", }}>
                  <ThumbUpIcon onClick={handleClick}/>
                </Typography>
                <Typography className="thumbs-icon" sx={{cursor:"pointer",color:"grey",visibility: "hidden",transition: "opacity 0.3s ease-in-out", marginTop:"5px"}}>
                <ThumbDownIcon  onClick={() => openFeedbackModal(chat.id)}/>
                </Typography>
               </Box>
               
               </Box>
               
                </Box>
            </CardContent>
          </Card>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          //   flexDirection: { xs: "column", sm: "row" },
          marginTop:"30px",
          gap: "10px",
          width: "100%",
          alignItems: { xs: "stretch", sm: "center" },  
          paddingBottom:"50px"
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
         onClick={handleSave}
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
        <Dialog open={isModalOpen} onClose={closeFeedbackModal}  >
          <DialogTitle>
            <Box sx={{display:"flex",gap:"20px", alignItems:"center"}}>
            <Typography><img src={tipsImg} alt="TipsImg"/></Typography>
            <Typography sx={{fontWeight: "400",font: "Open Sans", fontSize: "20px", }}>Provide Additional Feedback</Typography>
            </Box>  
            <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={closeFeedbackModal}>
              <CloseIcon sx={{fontWeight: "500",font: "Ubuntu", fontSize: "28px",color: "#000000",}}/>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={{width:"400px"}}
              placeholder="Write your feedback here..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFeedbackModal} sx={{backgroundColor:"#D7C7F4",fontWeight: "400",font: "Ubuntu", fontSize: "12px",color: "#000000",}}>Cancel</Button>
            <Button onClick={() => submitFeedback(currentChatId, feedback)} variant="contained" sx={{backgroundColor:"#D7C7F4",fontWeight: "400",font: "Ubuntu", fontSize: "12px",color: "#000000",}}>Submit</Button>
          </DialogActions>
        </Dialog> 
        </Box>
    </Box>
    </Box>
  );
};

export default ChatDetails;
