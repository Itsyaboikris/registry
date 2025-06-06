import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';

// Interface for Guest Book message data
export interface GuestMessage {
  id?: string;
  name: string;
  relationship: string;
  message: string;
  date?: string;
  timestamp?: Date;
}

/**
 * Submit a guest book message to Firestore
 */
export async function submitGuestMessage(data: GuestMessage): Promise<string> {
  try {
    // Add timestamp
    const messageWithTimestamp = {
      ...data,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'guestbook'), messageWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting guest message:', error);
    throw error;
  }
}

/**
 * Get guest book messages
 */
export async function getGuestMessages(messageLimit: number = 50): Promise<GuestMessage[]> {
  try {
    // Create query
    const messagesRef = collection(db, 'guestbook');
    const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(messageLimit));
    
    // Get messages
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        relationship: data.relationship,
        message: data.message,
        date: data.date
      };
    });
  } catch (error) {
    console.error('Error getting guest messages:', error);
    throw error;
  }
} 