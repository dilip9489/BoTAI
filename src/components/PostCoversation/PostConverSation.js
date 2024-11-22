import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import Img from '../../assets/Group 1000011096.png'
import BotAI from '../../assets/Group 1000011097.png'
import Sidebar from "../Sidebar/Sidebar";
import { Rating } from '@mui/material';

const currentDate = new Date();
const hours = currentDate.getHours(); 
const minutes = currentDate.getMinutes();  
const seconds = currentDate.getSeconds();  
const period = hours >= 12 ? 'PM' : 'AM';
const getTime = ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;


const PageConversation = () => {
  const [conversations, setConversations] = useState([]);
  const [ratings, setRatings] = useState({});
  const [filterRating, setFilterRating] = useState(0);
  const[feedback, setFeedback]=useState({})
  const filteredChats = conversations.filter((chat) => {
    return filterRating === 0 || ratings[chat.id] === filterRating;
  });

  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setConversations(savedConversations);
  }, []);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
    const savedFeedback = JSON.parse(localStorage.getItem("feedback")) || {};
    setFeedback(savedFeedback)
  }, []);

  return (
    <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
        
        // background: "linear-gradient(to bottom,  #9785BA33 100%)",
      }}>
    <Sidebar/>
    
    <Box sx={{
        width: { xs: "100%", sm: "80%" }, // Full width on small screens, 80% on larger screens
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       
       
        minHeightheight:"100vh",
        
        background: "linear-gradient(to bottom, #D7C7F433 5%, #9785BA33 95%)",
      }}>
      {/* Chat History UI */}
      <Box>
     <Typography variant="h4" sx={{marginBottom:"20px"}}>Conversation History</Typography>
    <FormControl sx={{marginBottom:"100px"}}>
          <InputLabel>Filter by rating</InputLabel>
          <Select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            label="Filter by rating"
            sx={{width:"20vw"}}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>1 Star</MenuItem>
            <MenuItem value={2}>2 Stars</MenuItem>
            <MenuItem value={3}>3 Stars</MenuItem>
            <MenuItem value={4}>4 Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
          
        </FormControl>
    </Box>
      <Box sx={{background:"#D7C7F421"}}>
      {filteredChats.length > 0 ? (
       
       filteredChats.map((conversation, index) => (
           <Box >
            <Card key={conversation.id} sx={{marginBottom:"30px",background:"#D7C7F421"}}>
            <CardContent>
                <Box sx={{display:"flex",justifyContent:"flex-start", alignItems:"center",   }}>
                <Typography sx={{width:"70px", height:"70px", borderRadius:"50%"}}><img src={Img} alt="AvatarImage"/></Typography>
                
               <Box sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start", marginLeft:"10px",  marginBottom:"20px", textAlign:"left"}}>
               <Typography variant="h6" sx={{ fontWeight: "700",font: "Ubuntu", fontSize: "16px",color: "#000000",}}>You</Typography>
               <Typography>{conversation.question}</Typography>
               <Typography sx={{color:"#0000009E",marginTop:"10px",font: "Open Sans", fontSize: "15px",fontWeight: "700"}}>{getTime}</Typography>
               
               </Box>
                </Box>
                </CardContent>
                </Card>
              <Card key={conversation.id} sx={{marginBottom:"30px",background:"#D7C7F421"}}> 
              <CardContent>
                <Box sx={{display:"flex",justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{width:"70px", height:"70px", borderRadius:"50%"}}><img src={BotAI} alt="AvatarImage"/></Typography>
                <Box sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start",marginLeft:"10px",   marginBottom:"20px", textAlign:"left"}}>
               <Typography variant="h6" sx={{ fontWeight: "700",font: "Ubuntu", fontSize: "16px",color: "#000000",}}>BoTAI</Typography>
               <Typography>{conversation.response}</Typography>
               <Rating
                          value={ratings[conversation.id]}
                           readonly
                        />
                 {feedback[conversation.id] && (
              <Typography sx={{ marginTop: "10px",  }}>
               Feedback: {feedback[conversation.id]}
              </Typography>
               )}
               <Typography sx={{color:"#0000009E",marginTop:"10px",font: "Open Sans", fontSize: "15px",fontWeight: "700"}}>{getTime}</Typography>
               </Box>
               
                </Box>
                
            </CardContent>
            </Card>
          </Box>
        ))
     
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No conversations found.
        </Typography>
      )}
    </Box>
    </Box>
    </Box>
  );
};

export default PageConversation;
