"use client";

import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        padding: "1rem 0",
        backgroundColor: "rgba(250, 247, 242, 0.9)"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <a href="/" style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "1.5rem",
            background: "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0px 0px 1px rgba(0, 0, 0, 0.1)",
            textDecoration: "none"
          }}>K&J</a>
          
          {/* Desktop Menu */}
          <div style={{
            display: "none",
            gap: "1.5rem",
            alignItems: "center",
            "@media (minWidth: 768px)": {
              display: "flex"
            }
          }}>
            <a href="/" style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none",
              transition: "color 0.2s"
            }}>Home</a>
            <a href="/#details" style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none",
              transition: "color 0.2s"
            }}>Details</a>
            <a href="/registry" style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none",
              transition: "color 0.2s"
            }}>Registry</a>
            <a href="/rsvp" style={{
              display: "inline-block",
              backgroundColor: "#d4b78f",
              color: "#ffffff",
              padding: "0.5rem 1.5rem",
              textDecoration: "none",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.2s"
            }}>RSVP</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            style={{
              display: "block",
              color: "#3c3c3c",
              background: "none",
              border: "none",
              cursor: "pointer",
              "@media (minWidth: 768px)": {
                display: "none"
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 99,
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease"
        }}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu */}
      <div style={{
        position: "fixed",
        top: 0,
        right: isMenuOpen ? 0 : "-100%",
        width: "80%",
        maxWidth: "300px",
        height: "100vh",
        backgroundColor: "#faf7f2",
        zIndex: 100,
        transition: "right 0.3s ease",
        padding: "2rem",
        boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem"
        }}>
          <button 
            onClick={toggleMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#3c3c3c"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <a 
            href="/" 
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none"
            }}
            onClick={toggleMenu}
          >Home</a>
          <a 
            href="/#details" 
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none"
            }}
            onClick={toggleMenu}
          >Details</a>
          <a 
            href="/registry" 
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.125rem",
              color: "#3c3c3c",
              textDecoration: "none"
            }}
            onClick={toggleMenu}
          >Registry</a>
          <a 
            href="/rsvp" 
            style={{
              display: "inline-block",
              backgroundColor: "#d4b78f",
              color: "#ffffff",
              padding: "0.5rem 1.5rem",
              textDecoration: "none",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.2s",
              textAlign: "center",
              marginTop: "1rem"
            }}
            onClick={toggleMenu}
          >RSVP</a>
        </div>
      </div>
    </>
  );
}