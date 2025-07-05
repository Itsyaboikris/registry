"use client";

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { submitSongSuggestion, getSongSuggestions, likeSongSuggestion, SongSuggestion } from '@/lib/firebase/music-playlist';

// reCAPTCHA site key - must be set in environment variables
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// interface SongSuggestion {
//   id: string;
//   title: string;
//   artist: string;
//   suggestedBy: string;
//   reason: string;
//   likes: number;
// }

// Sample song suggestions
// const initialSuggestions: SongSuggestion[] = [
//   {
//     id: '1',
//     title: 'Perfect',
//     artist: 'Ed Sheeran',
//     suggestedBy: 'Alex Johnson',
//     reason: 'Beautiful lyrics that capture the essence of your love.',
//     likes: 12
//   },
//   {
//     id: '2',
//     title: 'Can\'t Help Falling in Love',
//     artist: 'Elvis Presley',
//     suggestedBy: 'Maria Garcia',
//     reason: 'A timeless classic that never gets old.',
//     likes: 8
//   },
//   {
//     id: '3',
//     title: 'Thinking Out Loud',
//     artist: 'Ed Sheeran',
//     suggestedBy: 'John Smith',
//     reason: 'Great for the first dance!',
//     likes: 5
//   }
// ];

interface MusicPlaylistProps {
  isLoaded: boolean;
}

export const MusicPlaylist: React.FC<MusicPlaylistProps> = ({ isLoaded }) => {
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [newSuggestion, setNewSuggestion] = useState({ title: '', artist: '', suggestedBy: '', reason: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    resetOnExit: false
  });

  // Load songs from Firebase and initialize reCAPTCHA when component mounts
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetchedSongs = await getSongSuggestions();
        setSuggestions(fetchedSongs);
      } catch (error) {
        console.error('Error loading songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
    
    // Initialize reCAPTCHA only if site key is available
    if (RECAPTCHA_SITE_KEY) {
      const loadRecaptcha = () => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.body.appendChild(script);
      };
      
      loadRecaptcha();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSuggestion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newSuggestion.title || !newSuggestion.artist || !newSuggestion.suggestedBy) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    // Validate reCAPTCHA if enabled
    if (RECAPTCHA_SITE_KEY) {
      // @ts-ignore
      const recaptchaResponse = window.grecaptcha?.getResponse();
      if (!recaptchaResponse) {
        setFormError('Please complete the CAPTCHA verification');
        return;
      }
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Submit to Firebase
      await submitSongSuggestion(newSuggestion);
      
      // Show pending approval message
      setShowSuccess(true);
      setNewSuggestion({ title: '', artist: '', suggestedBy: '', reason: '' });
      
      // Reset reCAPTCHA
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        // @ts-ignore
        window.grecaptcha.reset();
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting song:', error);
      setFormError('An error occurred while submitting your song. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      // Update Firebase
      await likeSongSuggestion(id);
      
      // Update local state
      setSuggestions(prev => 
        prev.map(suggestion => 
          suggestion.id === id 
            ? { ...suggestion, likes: (suggestion.likes || 0) + 1 } 
            : suggestion
        )
      );
    } catch (error) {
      console.error('Error liking song:', error);
    }
  };

  const filteredSuggestions = searchTerm
    ? suggestions.filter(suggestion => 
        suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggestion.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suggestions;

  return (
    <section className="py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Music Playlist
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Help us create the perfect playlist for our special day
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Suggest a Song Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
                <h3 className="text-2xl font-playfair mb-6">Suggest a Song</h3>
                
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
                    Thank you for your song suggestion! It has been submitted for review and will appear in our playlist once approved.
                  </div>
                )}
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">
                    {formError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-1">
                      Song Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newSuggestion.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter song title"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="artist" className="block text-sm font-medium text-foreground/80 mb-1">
                      Artist *
                    </label>
                    <input
                      type="text"
                      id="artist"
                      name="artist"
                      value={newSuggestion.artist}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter artist name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="suggestedBy" className="block text-sm font-medium text-foreground/80 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="suggestedBy"
                      name="suggestedBy"
                      value={newSuggestion.suggestedBy}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="reason" className="block text-sm font-medium text-foreground/80 mb-1">
                      Why This Song?
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      value={newSuggestion.reason}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Tell us why you're suggesting this song"
                    ></textarea>
                  </div>
                  
                  {/* reCAPTCHA - only show if site key is available */}
                  {RECAPTCHA_SITE_KEY && (
                    <div className="mb-6">
                      <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY}></div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-primary text-white font-cormorant text-lg uppercase tracking-wider rounded-md hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Suggest Song'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Song Suggestions Display */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-playfair">Song Suggestions</h3>
                  <input
                    type="text"
                    placeholder="Search songs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 border border-primary/20 rounded-md text-sm"
                  />
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : filteredSuggestions.length === 0 ? (
                  <p className="text-center text-foreground/60 italic">
                    {searchTerm ? 'No songs match your search.' : 'Be the first to suggest a song!'}
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredSuggestions.map(suggestion => (
                      <div key={suggestion.id} className="border-b border-primary/10 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-playfair text-lg">{suggestion.title}</h4>
                            <p className="text-sm text-foreground/70">{suggestion.artist}</p>
                          </div>
                          <button
                            onClick={() => handleLike(suggestion.id!)}
                            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                          >
                            <span>❤️</span>
                            <span className="text-sm">{suggestion.likes || 0}</span>
                          </button>
                        </div>
                        <p className="text-sm text-foreground/80 mb-1">
                          <span className="italic">Suggested by {suggestion.suggestedBy}</span>
                        </p>
                        {suggestion.reason && (
                          <p className="text-sm text-foreground/60">{suggestion.reason}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};