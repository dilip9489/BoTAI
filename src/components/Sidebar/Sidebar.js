import React from "react";
import { useState } from "react";
import { Button, Box,  Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit"
 
import CloseIcon from "@mui/icons-material/Close";  

import editIcon from '../../assets/image 31.png'
import logo from '../../assets/image 29.png'
import { useNavigate } from "react-router";



const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate()

    const handleClick=()=>{
        navigate('/')
    }
    const handlePastConversationsClick = () => {
        navigate("/pageConversation");
      };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      {/* Hamburger menu for small screens */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2000,
        }}
      >
        {isOpen ? <CloseIcon sx={{position:"absolute", top:8, left:8, fontSize:"20px"}}/> : <MenuIcon />}
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          position: { xs: "fixed", sm: "static" },
          top: 0,
          left: 0,
          zIndex: 1000,
          width: { xs: isOpen ? "100%" : "0", sm: "50%", md: "20%" },
        //   height: { xs: isOpen ? "100vh" : "0", sm: "100vh" },
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          padding: isOpen ? "20px" : "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        //   borderBottom: { xs: isOpen ? "1px solid #ddd" : "none", sm: "none" },
          transition: "width 0.3s ease, height 0.3s ease, padding 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#D7C7F4",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              marginLeft: "20px",
              textAlign: "center",
              marginTop: "10px",
              marginRight: "20px",
              borderRadius:"20%"
            }}
          >
            <img src={logo} alt="logo" />
          </Typography>

          <Typography
            variant="h4"
            sx={{
              marginLeft: "20px",
              
              font: "Ubuntu",
              fontWeight: "400",
              fontSize: "20px",
              color: "#000000",
            }}
          >
            New Chat
          </Typography>

          <Button
          onClick={handleClick}
            sx={{
              textTransform: "none",
              backgroundColor: "#D7C7F4",
              marginLeft: {xs:"10px",sm:"20px"},
              width: "24px",
              height: "24px",
            }}
          >
            <img src={editIcon} alt="editIcon" />
          </Button>
        </Box>

        {/* Past Conversations */}
        <Button
         onClick={handlePastConversationsClick}
          sx={{
            padding: "10px",
            marginLeft: "20px",
            font: "Ubuntu",
            fontWeight: "700",
            marginTop: "20px",
            width: "80%",
            color: "#414146",
            textAlign: "center",
            backgroundColor: "#D7C7F4",
          }}
        >
          Past Conversations
        </Button>
      </Box>
    </>
  );
};

export default Sidebar;