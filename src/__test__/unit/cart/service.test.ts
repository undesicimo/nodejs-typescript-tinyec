import { CartService } from '../../../cart/service';

const cartservice = new CartService();

describe('クーポン割引test', () => {
    it('クーポンがない場合、10%の割引が効かない', () => {
        const cartItems = [
            { id: 2, name: 'ウェットティッシュ', price: 200 },
            { id: 1, name: 'ティッシュ', price: 100 },
        ];

        const coupon = { coupon: '' };

        const result = cartservice.calculate(cartItems, coupon);
        expect(result.totalPrice).toBe(300);
    });

    it('クーポンがある場合、10%の割引が効く', () => {
        const cartItems = [
            { id: 2, name: 'ウェットティッシュ', price: 200 },
            { id: 1, name: 'ティッシュ', price: 100 },
        ];

        const coupon = { coupon: 'XXXXX' };

        const result = cartservice.calculate(cartItems, coupon);
        expect(result.totalPrice).toBe(270);
    });
});
