import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FiSettings, FiInfo, FiMaximize, FiX, FiMinimize } from "react-icons/fi";
import { Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";

const App: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); //fullscreen
  const [isInfoOpen, setIsInfoOpen] = useState(false); //info
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); //settings
  const [selectedTheme, setSelectedTheme] = useState("light"); //theme

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleInfoOpen = () => {
    setIsInfoOpen(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus(); // Focus the text area when info opens
      }
    }, 50);
  };

  const handleInfoClose = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus(); // Ensure focus on textarea after closing
      }
    }, 50); 
  };

  const handleInfoMinimize = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus(); // Ensure focus on textarea after minimizing
      }
    }, 50); 
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50); 
  };


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(document.fullscreenElement !== null);
    });
    document.addEventListener("webkitfullscreenchange", () => {
      setIsFullscreen(document.webkitFullscreenElement !== null);
    });
    document.addEventListener("mozfullscreenchange", () => {
      setIsFullscreen(document.mozFullScreenElement !== null);
    });
    document.addEventListener("MSFullscreenChange", () => {
      setIsFullscreen(document.msFullscreenElement !== null);
    });

  
    setIsInfoOpen(true); 

    return () => {
      document.removeEventListener("fullscreenchange", () => {});
      document.removeEventListener("webkitfullscreenchange", () => {});
      document.removeEventListener("mozfullscreenchange", () => {});
      document.removeEventListener("MSFullscreenChange", () => {});
    };
  }, []);

  return (
    <div className="app-container">
      <div className="icon-container">
        <a
          href="#"
          title={isFullscreen ? "Exit Full Screen" : "Full Screen"}
          className="icon-link"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <FiMinimize className="icon" /> : <FiMaximize className="icon" />}
        </a>

        <a
          href="#"
          title="Info"
          className={`icon-link ${isInfoOpen ? 'info-hidden' : ''}`}
          onClick={handleInfoOpen}
        >
          <FiInfo className="icon" />
        </a>

        <a
          href="#"
          title="Settings"
          className={`icon-link `} //${isSettingsOpen ? 'info-hidden' : ''}
          onClick={handleSettingsOpen}
        >
          <FiSettings className="icon" />
        </a>
      </div>

      <textarea className="textarea" ref={textareaRef}></textarea>

      {/* Info Dialog */}
      <Dialog
        open={isInfoOpen}
        onClose={(e, reason) => reason === 'backdropClick' ? null : handleInfoClose()} // Prevent closing on backdrop click
        maxWidth="sm"
        fullWidth
        disableBackdropClick 
        PaperProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            width: "23%",
            height: "35%",
            fontWeight: 400,
            textDecoration: "rgb(33, 33, 33)",
            lineHeight: "24px",
            textAlign: "justify",
            fontFamily: "'Montserrat', sans-serif",
            position: "relative",
            padding: "16px"
          }
        }}
      >
        <div className="dialog-header">
          <Typography
            variant="h6"
            className="dialog-title"
            style={{ textAlign: "left", padding: "8px 16px", borderBottom: "1px solid #ccc" }}
          >
            JURNL
          </Typography>
          <IconButton
            aria-label="close"
            className="dialog-minimize-button"
            onClick={handleInfoMinimize}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <FiX />
          </IconButton>
        </div>
        <DialogContent style={{ textAlign: "left" }}>
          <Typography variant="body1" gutterBottom>
            JURNL is a sleek, minimalist writing tool for pc designed to enhance focus and provide a distraction-free writing experience.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            The settings icon (top right) will allow you to alter the colour theme, font style and spell check - as well as the ability to export the document.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Your document is automatically saved locally.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Built and maintained by{" "}
            <Link
              href="https://github.com/Kxrrrr"
              target="_blank"
              style={{
                color: "#73A6F6",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.cursor = "pointer";
              }}
            >
              Kxrrrr
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;