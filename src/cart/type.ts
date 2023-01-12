import type { Item } from '../items/types';

export type CartPrice = {
  totalPrice: number;
  cartItems: Item[];
};

export type CalculateResult = {
  totalPrice: number;
  discountPrice: number;
  cartItems: Item[];
  appliedCoupon?: string;
};
