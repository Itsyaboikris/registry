import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp, doc, updateDoc, increment } from 'firebase/firestore';

// Interface for Song Suggestion data
export interface SongSuggestion {
  id?: string;
  title: string;
  artist: string;
  suggestedBy: string;
  reason?: string;
  likes?: number;
  date?: string;
  timestamp?: Date;
}

/**
 * Submit a song suggestion to Firestore
 */
export async function submitSongSuggestion(data: SongSuggestion): Promise<string> {
  try {
    // Add timestamp and likes
    const suggestionWithMetadata = {
      ...data,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      likes: 0
    };
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'songs'), suggestionWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting song suggestion:', error);
    throw error;
  }
}

/**
 * Get song suggestions
 */
export async function getSongSuggestions(suggestionLimit: number = 50): Promise<SongSuggestion[]> {
  try {
    // Create query
    const songsRef = collection(db, 'songs');
    const q = query(songsRef, orderBy('likes', 'desc'), orderBy('timestamp', 'desc'), limit(suggestionLimit));
    
    // Get suggestions
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        artist: data.artist,
        suggestedBy: data.suggestedBy,
        reason: data.reason || '',
        likes: data.likes || 0,
        date: data.date
      };
    });
  } catch (error) {
    console.error('Error getting song suggestions:', error);
    throw error;
  }
}

/**
 * Like a song suggestion
 */
export async function likeSongSuggestion(songId: string): Promise<void> {
  try {
    const songRef = doc(db, 'songs', songId);
    await updateDoc(songRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error liking song suggestion:', error);
    throw error;
  }
} 