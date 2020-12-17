// Type of each Pokemon Set
export type IPkmnSet = {
  name: string;
  code: string;
  symbolUrl: string;
  logoUrl: string;
  totalCards: number;
};

// Type of each Pokemon Card
export type IPkmnCard = {
  id: string;
  number: number;
  imageUrl: string;
};

export type IPkmnDetail = {
  id: string;
  name: string;
  number: number;
  imageUrl: string;
  cardType: string;
  type: string;
  rarity: string;
  hp: string;
  set: string;
};

export enum HeaderActiveItem {
  Set,
  MyCards,
  Wishlist
}
