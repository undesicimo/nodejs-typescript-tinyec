import express, { json } from 'express';
import router from '../routes';
import request from 'supertest';

//app モジュール実装
const app = express();
app.use(json());
app.use('/', router);

const cartData = [
    { id: 1, name: 'ティッシュ', price: 100 },
    { id: 2, name: 'ウェットティッシュ', price: 200 },
    { id: 3, name: '除菌シート', price: 300 },
];

it('全アイテムの一覧が返ってくる', async () => {
    const res = await request(app).get('/items');
    expect(res.body).toEqual(cartData);
});

it('ディスカウントなしでカートの金額の合計が返ってくる', async () => {
    
    const cartItems = { itemIds: [1, 2, 3], coupon: 'X' }

    const res = await request(app)
        .post('/carts/calculate')
        .send(cartItems)
        .set('content-type', 'application/json');
    
    expect(res.body.totalPrice).toEqual(600)
});
it('ディスカウントありでカートの金額の合計が返ってくる', async () => {
    
    const cartItems = { itemIds: [1, 2, 3], coupon: 'XXXXX' }

    const res = await request(app)
        .post('/carts/calculate')
        .send(cartItems)
        .set('content-type', 'application/json');
    
    expect(res.body.totalPrice).toEqual(540)
});