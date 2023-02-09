import request from 'supertest';
import { app } from '../app';

const endpointRequest = request.agent(app);

describe('GET "/items" アイテム一覧 test', () => {
    it('request時、正常なエンドポイントは、status-code 200が返ってくる ', async () => {
        const res = await endpointRequest.get('/items');
        expect(res.statusCode).toEqual(200);
    });
    it('request時1件以上のデータが返ってくる ', async () => {
        const res = await endpointRequest.get('/items');
        expect(res.body.length > 1).toBe(true);
    });
    it('request時、正常なデータ型が返ってくる', async () => {
        const res = await endpointRequest.get('/items');
        expect(res.type).toBe('application/json');  
    });
});

describe('POST /carts/calculate カート内容金額計算', () => {
    it('ディスカウントなしでカートの金額の合計が返ってくる', async () => {
        const cartItems = { itemIds: [1, 2, 3], coupon: 'X' };

        const res = await endpointRequest
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');

        expect(res.body.totalPrice).toEqual(600);
    });
    it('ディスカウントありで割り引いた金額が返ってくる', async () => {
        const cartItems = { itemIds: [1, 2, 3], coupon: 'XXXXX' };

        const res = await endpointRequest
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');

        expect(res.body.totalPrice).toEqual(540);
    });
    it('クーポンが指定されていない場合、割り引いていない合計金額が返ってくる', async () => {
        // item idのみのheaders
        const cartItems = { itemIds: [1, 2, 3] };

        const res = await endpointRequest
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');

        expect(res.body.totalPrice).toEqual(600);
    });
});

describe('invalid テストケース', () => {
    it('GET 存在していないエンドポイント 404 返す', async () => {
        //存在しないエンドポイント
        const res = await endpointRequest.get('/ite');
        expect(res.statusCode).toEqual(404);
    });
    it('存在しないアイテムを計算すると、statuscode 400とメッセージが返ってくる ', async () => {
        // item id 一個多く
        const cartItems = { itemIds: [1, 2, 3, 4], coupon: 'XXXXX' };

        const res = await endpointRequest
            .post('/carts/calculate')
            .send(cartItems)
            .set('content-type', 'application/json');
        expect(res.body.message).toEqual('Not Found Error');
        expect(res.statusCode).toEqual(400);
    });
});
