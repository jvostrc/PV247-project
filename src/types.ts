// Type of each Pokemon Set
export type IPkmnSet = {
  name: string;
  code: string;
  symbolUrl: string;
  logoUrl: string;
  totalCards: number;
};

export type Screen = "wishlist" | "my-cards" | "sets";

export type ISets = {
  sets: {
    sets: IPkmnSet[];
  }
}

export type ICards = {
  cards: {
    card: IPkmnDetail[];
  }
}

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
    setCode: string;
  };
};

export enum HeaderActiveItem {
  Set,
  MyCards,
  Wishlist
}

export type DbCard = {
  cardId: string;
  name: String;
  imageSrc: string;
  cardNumber: number;
  cardSet: string;
  cardSetName: string;
}

export type SearchType = {
  cards?: IPkmnCard[];
  sets?: IPkmnSet[];
}