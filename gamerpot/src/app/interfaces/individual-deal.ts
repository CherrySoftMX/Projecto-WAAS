export interface IndividualDealInterface {
  title: string;
  dealID: string;
  storeID: string;
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
