export interface IndividualDealInterface {
  title: string;
  dealID: number;
  storeID: number;
  gameID: string;
  salePrice: number;
  normalPrice: number;
  savings: number;
  metacriticScore: number;
  thumb: string;
  storeName: string;
  images: {
    icon: string;
  };
}
