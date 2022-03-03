export interface Product {
  idProduct: number;
  title: string;
  weight: string;
  price: string;
  type: string;
  promo: boolean;
  imagePath: string;
  ingredients: IngredientsForProduct[] | null;
}
export interface IngredientsForProduct {
  idIngredient: number;
  ingredTitle: string;
  ingredQuantity: number;
  ingredPrice: string;
}
export interface Order {
  name: string;
  phone: string;
  orderList: OrderList[];
}
export interface OrderList {
  idProduct: number;
  title: string;
  price: string;
  productQuantity: number;
  ingrediantList: ingrediantList[] | null;
}
export interface ingrediantList {
  ingredTitle: string;
  idIngredient: number;
  newIngredQuantity: number;
}
export interface Filial {
  idFilial: number;
  filialTitle: string;
  lat: string;
  lon: string;
  phone: string;
  adress: string;
  email: string;
}
