import React, { useState, useRef, useEffect } from "react";
import './app.css';
import { FiInfo, FiMaximize, FiX, FiMinimize, FiDownload } from "react-icons/fi";
import { Dialog, DialogContent, Typography, IconButton, Link } from "@mui/material";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";

const App: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen
  const [isInfoOpen, setIsInfoOpen] = useState(false); // Info Dialog
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false); // Spell Check
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // Status Message

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleInfoOpen = () => {
    setIsInfoOpen(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  const handleInfoClose = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  const handleInfoMinimize = () => {
    setIsInfoOpen(false);
    setTimeout(() => {
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    document.addEventListener("fullscreenchange", () => {
      setIsFullscreen(document.fullscreenElement !== null);
    });

    setIsInfoOpen(true);

    return () => {
      document.removeEventListener("fullscreenchange", () => {});
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
          className={`icon-link ${isInfoOpen ? "info-hidden" : ""}`}
          onClick={handleInfoOpen}
        >
          <FiInfo className="icon" />
        </a>

        <a
          href="#"
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
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: "auto",
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
