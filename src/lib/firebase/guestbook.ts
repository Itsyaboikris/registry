import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp, where } from 'firebase/firestore';

// Interface for Guest Book message data
export interface GuestMessage {
  id?: string;
  name: string;
  relationship: string;
  message: string;
  date?: string;
  timestamp?: Date;
  isApproved?: boolean;
}

/**
 * Submit a guest book message to Firestore
 */
export async function submitGuestMessage(data: GuestMessage): Promise<string> {
  try {
    // Add timestamp and set as not approved by default
    const messageWithMetadata = {
      ...data,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      isApproved: false // Messages require approval by default
    };
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'guestbook'), messageWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting guest message:', error);
    throw error;
  }
}

/**
 * Get guest book messages
 */
export async function getGuestMessages(messageLimit: number = 50, onlyApproved: boolean = true): Promise<GuestMessage[]> {
  try {
    // Create query
    const messagesRef = collection(db, 'guestbook');
    let q;
    
    if (onlyApproved) {
      // Only get approved messages
      q = query(
        messagesRef, 
        where('isApproved', '==', true),
        orderBy('timestamp', 'desc'), 
        limit(messageLimit)
      );
    } else {
      // Get all messages (for admin)
      // Add admin=true parameter for Firestore rules
      q = query(
        messagesRef, 
        orderBy('timestamp', 'desc'), 
        limit(messageLimit)
      );
    }
    
    // Get messages - pass admin=true parameter for admin access
    // For Firebase rules to work with query parameters
    const queryOptions = onlyApproved ? {} : { admin: "true" };
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        relationship: data.relationship,
        message: data.message,
        date: data.date,
        isApproved: data.isApproved
      };
    });
  } catch (error) {
    console.error('Error getting guest messages:', error);
    throw error;
  }
} 