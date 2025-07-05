
export interface FavoriteItem {
  productId : string;
}

export interface FavoriteItemDetailed extends FavoriteItem {
  uid: string;
  name : string;
  price : number;
  imageUrl : string;
  shortdescription:string;
}