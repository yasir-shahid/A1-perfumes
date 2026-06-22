/**
 * Shared Type Definitions for A-ONE LUXURY FRAGRANCE
 */

export interface AttarItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imagePath: string;
  notes: string[];
  longevity: string; // e.g. "12+ Hours"
  projection: string; // e.g. "Strong"
  category: string; // e.g. "Musk / Creamy", "Earthy / Vetiver"
  isPopular?: boolean;
  price?: number; // e.g. 1499
  intensity?: number; // 1 to 5 scale
  season?: string; // recommended season
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface ConsultationFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  selectedAttar: string;
  selectedSize: string;
  visitDate: string; // e.g. "2026-05-25T14:30"
  specialInstructions: string;
}

export interface FullCatalogAttar {
  id: string;
  sNo: number;
  name: string;
  prices: {
    ml3: number;
    ml6: number;
    ml12: number;
  };
  category: 'Oud Collection' | 'Musk Collection' | 'Floral' | 'Special Collection';
}

