export interface House {
  id: string
  price: number;
  postalAddress: string;
  size: number;
  country: string;
  disponibility: string;
  nbRoom: number;
  nbPiece: number;
  owner: User;
}

export interface HouseWithoutUser {
  price: number;
  postalAddress: string;
  size: number;
  country: string;
  disponibility: string;
  nbRoom: number;
  nbPiece: number;
}

export interface User {
  name: string ;
  publicAddress: string;
  flag: boolean;
}
