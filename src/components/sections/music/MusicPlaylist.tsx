"use client";

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { submitSongSuggestion, getSongSuggestions, likeSongSuggestion, SongSuggestion } from '@/lib/firebase/music-playlist';

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

  // Load songs from Firebase when component mounts
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
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Submit to Firebase
      const songId = await submitSongSuggestion(newSuggestion);
      
      // Update local state with new song
      const newSong: SongSuggestion = {
        id: songId,
        ...newSuggestion,
        likes: 0,
        date: new Date().toISOString().split('T')[0]
      };
      
      setSuggestions(prev => [newSong, ...prev]);
      setNewSuggestion({ title: '', artist: '', suggestedBy: '', reason: '' });
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-playfair text-center mb-4 gold-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Music Playlist
          </h2>
          <p className={`text-xl font-cormorant text-center mb-12 text-foreground/80 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Help us create the perfect soundtrack for our celebration
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Suggest a Song Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
                <h3 className="text-2xl font-playfair mb-6">Suggest a Song</h3>
                
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
                    Thank you for your suggestion! It has been added to our playlist.
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
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-primary text-white font-cormorant text-lg uppercase tracking-wider rounded-md hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Add to Playlist'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Song Suggestions Display */}
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white p-8 rounded-lg shadow-xl border border-primary/10">
                <h3 className="text-2xl font-playfair mb-6">Suggested Songs</h3>
                
                {/* Search Box */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search songs or artists..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : filteredSuggestions.length === 0 ? (
                    <p className="text-center text-foreground/60 italic">
                      {searchTerm ? 'No songs match your search' : 'Be the first to suggest a song!'}
                    </p>
                  ) : (
                    filteredSuggestions.map(suggestion => (
                      <div key={suggestion.id} className="border-b border-primary/10 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-playfair text-xl">{suggestion.title}</h4>
                            <p className="text-foreground/80">{suggestion.artist}</p>
                            <p className="text-sm text-foreground/60 mt-1">
                              Suggested by: {suggestion.suggestedBy}
                            </p>
                            {suggestion.reason && (
                              <p className="font-cormorant text-foreground/70 mt-2 italic">
                                "{suggestion.reason}"
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleLike(suggestion.id!)}
                            className="flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                          >
                            <span className="mr-1 text-lg">♥</span>
                            <span>{suggestion.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 