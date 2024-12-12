import React, { useState, useRef, useEffect } from "react";
import "./App.css";
<<<<<<< HEAD
import { FiInfo, FiMaximize, FiX, FiMinimize, FiDownload, FiMoon, FiSun } from "react-icons/fi";
=======
import { FiInfo, FiMaximize, FiX, FiMinimize, FiDownload } from "react-icons/fi";
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
import { Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";
import SpellcheckIcon from "@mui/icons-material/Spellcheck"; // Importing Spellcheck Icon

const App: React.FC = () => {
<<<<<<< HEAD
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // fullscreen state
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false); // info dialog state
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
=======
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen
  const [isInfoOpen, setIsInfoOpen] = useState(false); // Info Dialog
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false); // Spell Check
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // Status Message

  const textareaRef = useRef<HTMLTextAreaElement>(null);
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf

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
<<<<<<< HEAD
      textareaRef.current?.focus();
=======
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
    }, 50);
  };

  const handleInfoClose = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
<<<<<<< HEAD
      textareaRef.current?.focus();
=======
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
    }, 50);
  };

  const handleInfoMinimize = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
<<<<<<< HEAD
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

 
=======
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  const toggleSpellCheck = () => {
    setSpellCheckEnabled(!spellCheckEnabled);
    setStatusMessage(`Spell Check ${!spellCheckEnabled ? "Enabled" : "Disabled"}`);
    setTimeout(() => setStatusMessage(null), 2000); // Clear message after 2 seconds
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

>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
  useEffect(() => {
    textareaRef.current?.focus();
    const fullscreenChangeHandler = () => {
      setIsFullscreen(document.fullscreenElement !== null);
<<<<<<< HEAD
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
=======
    });

    setIsInfoOpen(true);

    return () => {
      document.removeEventListener("fullscreenchange", () => {});
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
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
<<<<<<< HEAD
          title="Export"
          className="icon-link"
          onClick={exportContent}
        >
=======
          title="Enable/Disable Spell Check"
          className="icon-link"
          onClick={toggleSpellCheck}
        >
          <SpellcheckIcon
            className="icon"
            style={{ color: spellCheckEnabled ? "green" : "inherit" }}
          />
        </a>

        <a
          href="#"
          title="Export"
          className="icon-link"
          onClick={exportContent}
        >
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
          <FiDownload className="icon" />
        </a>
      </div>

      <textarea
        className="textarea"
        ref={textareaRef}
        spellCheck={spellCheckEnabled}
      ></textarea>

      {/* Status Message */}
      {statusMessage && (
        <div className="status-message" style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "8px",
          zIndex: 1000,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "14px",
        }}>
          {statusMessage}
        </div>
      )}

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
<<<<<<< HEAD
              xs: "90%",
              sm: "80%",
              md: "60%",
              lg: "25%",
=======
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: "auto",
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
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
<<<<<<< HEAD
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
=======
        <DialogContent style={{ textAlign: "justify", fontFamily: "Montserrat, sans-serif", color: "#858585" }}>
          <Typography variant="body1" gutterBottom>
            JURNL is a sleek, minimalist writing tool designed to enhance focus and provide a distraction-free writing experience.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585" }}>
            Use the spell check icon (top right) to enable or disable spell check functionality.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585" }}>
            Use the export icon (top right) to download the the written content in .txt format. Your document is automatically saved locally.
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", fontFamily: "Montserrat, sans-serif", color: "#858585" }}>
>>>>>>> 59562b6802a63a8dbbeb9818b84e7186587d2ddf
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
