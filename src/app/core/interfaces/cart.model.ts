export interface CartItem {
  productId : string;
  quantity : number;
}

export interface CartItemDetailed extends CartItem {
  uid: string;
  name : string;
  price : number;
  imageUrl : string;
  lineTotal : number;
}