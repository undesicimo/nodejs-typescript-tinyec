import { CartService } from '../cart/service';

const cartservice = new CartService();

it('クーポンがある場合、10%の割引が効く', () => {
    const result = cartservice.calculate(
        [
            { id: 2, name: 'ウェットティッシュ', price: 200 },
            { id: 1, name: 'ティッシュ', price: 100 },
        ],
        { coupon: 'XXXXX' }
    );
    expect(result.totalPrice).toBe(270)
});
