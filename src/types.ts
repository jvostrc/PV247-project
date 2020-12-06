// Type of each Pokemon Set
export type IPkmnSet = {
  name: string;
  code: string;
  symbolUrl: string;
  logoUrl: string;
  totalCards: number;
};

export enum HeaderActiveItem {
  Set,
  MyCards,
  Wishlist
}
