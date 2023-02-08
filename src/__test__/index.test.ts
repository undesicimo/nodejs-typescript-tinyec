import request from 'supertest';
import { app } from '../app';



describe('GET "/items" アイテム一覧test', () => {
    const cartData = [
        { id: 1, name: 'ティッシュ', price: 100 },
        { id: 2, name: 'ウェットティッシュ', price: 200 },
        { id: 3, name: '除菌シート', price: 300 },
    ];

    it('responseとアイテム一覧が一致している', async () => {
        const res = await request(app).get('/items');
        expect(res.body).toEqual(cartData);
    });
});

describe('POST /carts/calculate カート内容金額計算', () => {
    it('ディスカウントなしでカートの金額の合計が返ってくる', async () => {
        const cartItems = { itemIds: [1, 2, 3], coupon: 'X' };

        const res = await request(app)
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');

        expect(res.body.totalPrice).toEqual(600);
    });
    it('ディスカウントありで割り引いた金額が返ってくる', async () => {
        const cartItems = { itemIds: [1, 2, 3], coupon: 'XXXXX' };

        const res = await request(app)
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');

        expect(res.body.totalPrice).toEqual(540);
    });
});

describe('invalid テストケース', () => {
    it('GET 存在していないエンドポイント 404 返す', async () => {
        //存在しないエンドポイント
        const res = await request(app).get('/ite');
        expect(res.statusCode).toEqual(404);
    });
    it('存在しないアイテムを計算すると、statuscode 400とメッセージが返ってくる ', async () => {
        // id 一個多く
        const cartItems = { itemIds: [1, 2, 3, 4], coupon: 'XXXXX' };

        const res = await request(app)
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');
        expect(res.body.message).toEqual('Not Found Error');
        expect(res.statusCode).toEqual(400);
    });
});
