import { IndividualDealInterface } from './individual-deal';

export interface GameDealListInterface {
  deals: Array<IndividualDealInterface>,
  totalPages: string
}
