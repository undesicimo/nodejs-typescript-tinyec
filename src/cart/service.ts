import type { Item } from '../items/types';
import type { CalculateResult, CartPrice } from './type';

export class CartService {
  calculate(
    items: Item[],
    option?: {
      coupon?: string;
    }
  ) {
    const cartPrice = items.reduce(
      (result, item) => {
        result.totalPrice += item.price;
        result.cartItems.push(item);
        return result;
      },
      { totalPrice: 0, cartItems: [] as Item[] } as CartPrice
    );

    return this.applyCoupon(cartPrice, option?.coupon);
  }
  private applyCoupon(
    cartPrice: CartPrice,
    couponCode?: string
  ): CalculateResult {
    const discountPrice = (() => {
      if (couponCode === 'XXXXX') {
        return cartPrice.totalPrice * 0.1;
      }
      return 0;
    })();
    return {
      totalPrice: cartPrice.totalPrice - discountPrice,
      discountPrice,
      cartItems: cartPrice.cartItems,
    };
  }
}
