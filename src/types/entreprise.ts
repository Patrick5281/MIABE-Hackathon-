export type TypeDechetEntreprise = 
  | 'industriel'
  | 'chimique'
  | 'electronique'
  | 'plastique'
  | 'metal'
  | 'papier'
  | 'organique'
  | 'autre';

export type StatutCollecte = 'en_attente' | 'en_cours' | 'terminee';

export interface DeclarationDechetEntreprise {
  id: string;
  type: TypeDechetEntreprise;
  quantite: number;
  unite: 'kg' | 'tonne' | 'unite';
  description: string;
  photo?: string;
  localisation?: {
    lat: number;
    lng: number;
    adresse: string;
  };
  dateDeclaration: string;
  statut: 'en_attente' | 'valide' | 'refuse';
  entrepriseId: string;
}

export interface Collecte {
  id: string;
  dateCollecte: string;
  statut: StatutCollecte;
  dechetId: string;
  collecteurId: string;
  entrepriseId: string;
  adresseCollecte: string;
  commentaire?: string;
}

export interface StatistiquesEntreprise {
  totalDechetsKg: number;
  totalDechetsTraites: number;
  totalCollectes: number;
  impactEnvironnemental: {
    co2Evite: number;
    eauEconomisee: number;
    energieEconomisee: number;
  };
  repartitionParType: Record<TypeDechetEntreprise, number>;
  evolutionMensuelle: Array<{
    mois: string;
    quantite: number;
  }>;
}

export interface ProfilEntreprise {
  id: string;
  nom: string;
  secteurActivite: string;
  siret: string;
  adresse: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  logo?: string;
  dateInscription: string;
  nombreEmployes: number;
} 