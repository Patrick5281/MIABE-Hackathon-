export type TypeDechet = 
  | 'plastique'
  | 'electronique'
  | 'verre'
  | 'papier'
  | 'metal'
  | 'organique'
  | 'autre';

export interface DeclarationDechet {
  id: string;
  userId: string;
  type: TypeDechet;
  quantite: number;
  unite: 'kg' | 'unite';
  photoUrl?: string;
  dateDeclaration: Date;
  statut: 'en_attente' | 'valide' | 'refuse';
  pointsGagnes: number;
}

export interface Recompense {
  id: string;
  nom: string;
  description: string;
  pointsNecessaires: number;
  imageUrl: string;
  disponible: boolean;
}

export interface StatistiquesParticulier {
  totalPoints: number;
  dechetsDeclares: number;
  dechetsValides: number;
  pointsGagnes: number;
  recompensesEchangees: number;
}

export interface ProfilParticulier {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  dateInscription: Date;
  statistiques: StatistiquesParticulier;
} 