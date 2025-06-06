import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, Timestamp, DocumentData } from 'firebase/firestore';

// Interface for RSVP data
export interface RSVPData {
  name: string;
  email: string;
  attending: boolean;
  guestCount: number;
  dietaryRestrictions: string;
  message?: string;
  timestamp?: Date;
}

/**
 * Submit an RSVP to Firestore
 */
export async function submitRSVP(data: RSVPData): Promise<string> {
  try {
    // Add timestamp
    const rsvpWithTimestamp = {
      ...data,
      timestamp: Timestamp.now()
    };
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'rsvps'), rsvpWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }
}

/**
 * Check if an email has already RSVP'd
 */
export async function checkExistingRSVP(email: string): Promise<boolean> {
  try {
    const rsvpRef = collection(db, 'rsvps');
    const q = query(rsvpRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking existing RSVP:', error);
    throw error;
  }
}

/**
 * Update an existing RSVP
 */
export async function updateRSVP(email: string, data: Partial<RSVPData>): Promise<void> {
  try {
    // This is a simplified implementation
    // In a real app, you might want to find the document ID first and then update it
    console.log(`Would update RSVP for ${email} with data:`, data);
    // Implementation would go here
  } catch (error) {
    console.error('Error updating RSVP:', error);
    throw error;
  }
} 