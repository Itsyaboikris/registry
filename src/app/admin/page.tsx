"use client";

import { useState, useEffect } from "react";
import { getGuestMessages, GuestMessage } from "@/lib/firebase/guestbook";
import { getSongSuggestions, SongSuggestion } from "@/lib/firebase/music-playlist";
import { getRSVPs, RSVPData } from "@/lib/firebase/rsvp";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"guestbook" | "songs" | "rsvp">("guestbook");
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [songSuggestions, setSongSuggestions] = useState<SongSuggestion[]>([]);
  const [rsvps, setRsvps] = useState<(RSVPData & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simple authentication (in production you would use proper auth)
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "weddingadmin";
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("wedding_admin_auth", "true");
    } else {
      alert("Incorrect password");
    }
  };
  
  // Load data when authenticated
  useEffect(() => {
    // Check if already authenticated
    const savedAuth = localStorage.getItem("wedding_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load guestbook messages, song suggestions, and RSVPs
      const [messages, songs, rsvpData] = await Promise.all([
        getGuestMessages(100, false), // Get all messages including unapproved
        getSongSuggestions(100, false), // Get all songs including unapproved
        getRSVPs() // Get all RSVPs
      ]);
      
      setGuestMessages(messages);
      setSongSuggestions(songs);
      setRsvps(rsvpData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const approveItem = async (id: string, collection: "guestbook" | "songs") => {
    try {
      const itemRef = doc(db, collection, id);
      await updateDoc(itemRef, {
        isApproved: true
      });
      
      // Update local state
      if (collection === "guestbook") {
        setGuestMessages(prev => 
          prev.map(msg => 
            msg.id === id ? { ...msg, isApproved: true } : msg
          )
        );
      } else {
        setSongSuggestions(prev => 
          prev.map(song => 
            song.id === id ? { ...song, isApproved: true } : song
          )
        );
      }
    } catch (error) {
      console.error("Error approving item:", error);
    }
  };
  
  const deleteItem = async (id: string, collection: "guestbook" | "songs") => {
    try {
      const itemRef = doc(db, collection, id);
      await updateDoc(itemRef, {
        isApproved: false,
        isDeleted: true
      });
      
      // Update local state
      if (collection === "guestbook") {
        setGuestMessages(prev => prev.filter(msg => msg.id !== id));
      } else {
        setSongSuggestions(prev => prev.filter(song => song.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("wedding_admin_auth");
    setIsAuthenticated(false);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getGuestNamesDisplay = (rsvp: RSVPData & { id: string }) => {
    if (!rsvp.guestNames || rsvp.guestNames.length === 0) {
      return rsvp.name;
    }
    return rsvp.guestNames.join(", ");
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="font-playfair text-3xl text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#faf7f2] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "guestbook" ? "border-b-2 border-primary text-primary" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("guestbook")}
          >
            Guest Book
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "songs" ? "border-b-2 border-primary text-primary" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("songs")}
          >
            Song Suggestions
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "rsvp" ? "border-b-2 border-primary text-primary" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("rsvp")}
          >
            RSVPs
          </button>
        </div>
        
        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : activeTab === "guestbook" ? (
            <>
              <h2 className="text-2xl font-playfair mb-4">Guest Book Messages</h2>
              <button 
                onClick={loadData} 
                className="mb-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Refresh
              </button>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guestMessages.map((message) => (
                      <tr key={message.id} className={message.isApproved ? "bg-green-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{message.relationship}</td>
                        <td className="px-6 py-4">{message.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{message.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {message.isApproved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {!message.isApproved && (
                            <button
                              onClick={() => approveItem(message.id!, "guestbook")}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem(message.id!, "guestbook")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : activeTab === "songs" ? (
            <>
              <h2 className="text-2xl font-playfair mb-4">Song Suggestions</h2>
              <button 
                onClick={loadData} 
                className="mb-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Refresh
              </button>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {songSuggestions.map((song) => (
                      <tr key={song.id} className={song.isApproved ? "bg-green-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">{song.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{song.artist}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{song.suggestedBy}</td>
                        <td className="px-6 py-4">{song.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{song.likes}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {song.isApproved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {!song.isApproved && (
                            <button
                              onClick={() => approveItem(song.id!, "songs")}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem(song.id!, "songs")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-playfair mb-4">RSVP Submissions</h2>
              <button 
                onClick={loadData} 
                className="mb-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Refresh
              </button>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Guest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All Guests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attending</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietary Restrictions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className={rsvp.attending ? "bg-green-50" : "bg-red-50"}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{rsvp.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{rsvp.email}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {getGuestNamesDisplay(rsvp)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {rsvp.attending ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{rsvp.guestCount}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm max-w-xs truncate">
                            {rsvp.dietaryRestrictions || "None"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm max-w-xs truncate">
                            {rsvp.message || "None"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatDate(rsvp.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 