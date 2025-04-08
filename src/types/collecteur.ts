import { TypeDechet } from './dechet';
import { Adresse } from './common';

export type StatutMission = 'en_attente' | 'attribuee' | 'en_cours' | 'terminee' | 'annulee';

export interface Mission {
  id: string;
  typeDechet: TypeDechet;
  quantiteEstimee: number;
  unite: string;
  adresseCollecte: Adresse;
  dateCollectePrevue: string;
  dateLimite: string;
  contactClient: {
    nom: string;
    telephone: string;
    email: string;
    type: 'particulier' | 'entreprise';
  };
  statut: StatutMission;
  recompense: {
    points: number;
    montant: number;
  };
  notes?: string;
}

export interface Recompense {
  id: string;
  type: 'points' | 'eco_badge' | 'bonus_financier';
  montant: number;
  points: number;
  dateObtention: string;
  missionId: string;
  description: string;
}

export interface StatistiquesCollecteur {
  totalCollectes: number;
  totalDechetsCollectes: number;
  scoreEcologique: number;
  tauxSatisfaction: number;
  pointsCumules: number;
  revenusGeneres: number;
  collectesParMois: Array<{
    mois: string;
    nombre: number;
  }>;
  dechetsParType: Record<string, number>;
}

export interface Document {
  id: string;
  type: 'permis' | 'assurance' | 'certification' | 'autre';
  nom: string;
  dateUpload: string;
  dateExpiration?: string;
  url: string;
  statut: 'valide' | 'en_attente' | 'expire';
}

export interface ZoneIntervention {
  departement: string;
  codePostal: string[];
  rayon: number; // en km
}

export interface ProfilCollecteur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photoUrl?: string;
  adresse: Adresse;
  zonesIntervention: ZoneIntervention[];
  documents: Document[];
  vehicules: Array<{
    type: string;
    immatriculation: string;
    capacite: number;
  }>;
  specialites: TypeDechet[];
  disponibilites: Array<{
    jour: 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
    heureDebut: string;
    heureFin: string;
  }>;
  statistiques: StatistiquesCollecteur;
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  evaluationMoyenne: number;
}

export interface CollecteHistorique extends Mission {
  dateCollecteEffective: string;
  quantiteReelle: number;
  photos: string[];
  signature: string;
  commentaire?: string;
  evaluation?: {
    note: number;
    commentaire: string;
    date: string;
  };
} 