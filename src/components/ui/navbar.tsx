"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  isTransparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTransparent = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isTransparent || isMenuOpen
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-playfair text-2xl text-primary">
            J & K
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center space-x-8"
            style={{
              "@media (min-width: 768px)": {
                display: "flex",
              },
            } as any}
          >
            <Link
              href="#timeline"
              className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="/gallery"
              className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#guestbook"
              className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Guest Book
            </Link>
            <Link
              href="/rsvp"
              className="font-cormorant text-lg text-white bg-primary px-6 py-2 rounded hover:bg-primary/80 transition-colors"
            >
              RSVP
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground/80 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              "@media (min-width: 768px)": {
                display: "none",
              },
            } as any}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-60 py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link
            href="#timeline"
            className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Timeline
          </Link>
          <Link
            href="/gallery"
            className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="#guestbook"
            className="font-cormorant text-lg text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Guest Book
          </Link>
          <Link
            href="/rsvp"
            className="font-cormorant text-lg text-white bg-primary px-6 py-2 rounded hover:bg-primary/80 transition-colors inline-block"
            onClick={() => setIsMenuOpen(false)}
          >
            RSVP
          </Link>
        </div>
      </div>
    </nav>
  );
};