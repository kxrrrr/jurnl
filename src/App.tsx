import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FiInfo, FiMaximize, FiX, FiMinimize, FiDownload, FiMoon, FiSun } from "react-icons/fi";
import { Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";

const App: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // fullscreen state
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false); // info dialog state
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      document.body.classList.add("fullscreen");
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      document.body.classList.remove("fullscreen");
      setIsFullscreen(false);
    }
  };

  const handleInfoOpen = () => {
    setIsInfoOpen(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleInfoClose = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleInfoMinimize = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const exportContent = () => {
    const content = textareaRef.current?.value;
    if (content) {
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.txt";
      link.click();
    }
  };

 
  useEffect(() => {
    textareaRef.current?.focus();
    const fullscreenChangeHandler = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
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

        {/* Info Button */}
        <a
          href="#"
          title="Info"
          className={`icon-link ${isInfoOpen ? "info-hidden" : ""}`}
          onClick={handleInfoOpen}
        >
          <FiInfo className="icon" />
        </a>

        {/* Export Button */}
        <a
          href="#"
          title="Export"
          className="icon-link"
          onClick={exportContent}
        >
          <FiDownload className="icon" />
        </a>
      </div>

      <textarea className="textarea" ref={textareaRef}></textarea>

      {/* Info Dialog */}
      <Dialog
        open={isInfoOpen}
        onClose={(e, reason) =>
          reason === "backdropClick" ? null : handleInfoClose()
        }
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            padding: "16px",
            fontWeight: 400,
            textDecoration: "rgb(33, 33, 33)",
            lineHeight: "24px",
            textAlign: "justify",
            fontFamily: "'Montserrat', sans-serif",
            position: "relative",
            width: {
              xs: "90%",
              sm: "80%",
              md: "60%",
              lg: "25%",
            },
            height: {
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: "auto",
            },
            maxHeight: "90%",
          },
        }}
      >
        <div className="dialog-header">
          <Typography
            variant="h6"
            className="dialog-title"
            style={{
              textAlign: "left",
              padding: "8px 16px",
              borderBottom: "1px solid #ccc",
            }}
          >
            JURNL
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleInfoMinimize}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <FiX />
          </IconButton>
        </div>
        <DialogContent style={{ textAlign: "justify", fontFamily: "Montserrat, sans-serif", color: "#858585"}}>
          <Typography variant="body1" gutterBottom>
            JURNL is a sleek, minimalist writing tool designed to enhance focus and provide a distraction-free writing experience.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585"}}>
            The import icon (top right) will give you the ability the ability to export the document.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585"}}>
            Your document is automatically saved locally.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585"}}>
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
