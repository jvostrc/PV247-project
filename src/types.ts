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
  card: {
    id: string;
    name: string;
    imageUrl: string;
    types: string[];
    subtype: string;
    hp: string;
    number: number;
    rarity: string;
    set: string;
  };
};

export enum HeaderActiveItem {
  Set,
  MyCards,
  Wishlist
}
