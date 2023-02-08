## これは何

研修用の簡易的なアプリケーション

 ### 概要

- 本システムはRESTFul APIを提供するアプリケーションである
- ECサイトのマイクロサービスの一部分であり、金額計算を担う
- エンドポイントが受け取ったアイテムから、金額を取得し、計算して返すものである

### 仕様

- 用意されているエンドポイントは2つ
  1. アイテムの一覧を返すエンドポイント
     - GET /items
  2. カートの金額を計算するエンドポイント
    - POST /carts/calculate
    - body: { itemIds: number[]; coupon?: string }
- カートの金額を計算するエンドポイントにはクーポンを適用し、ディスカウントを効かせることができる
  - 適用可能なクーポンコードは `XXXXX` で、適用成功すると 10% オフになる

### ゴール

- テストを実装し、仕様通りの動作をするかどうかを確認できている
- 仮に不具合があれば、修正されている

## 動かしかた

- dockerが使えるならば、以下のコマンドでアプリケーションを立ち上げることができる

```
docker compose up -d 
```

- ローカルで立ち上げる際は以下のコマンドで立ち上げる
  - dbを立ち上げる
    - `docker compose up -d postgres`
  - アプリケーションを立ち上げる
    - `npm run exec` 
- リクエストの投げ方
  - アイテム一覧の取得
    - curl http://localhost:8080/items -H "content-type: application/json"
  - 金額計算
    - curl -X POST http://localhost:8080/carts/calculate -H "content-type: application/json" -d '{"itemIds": [1,2,3], "coupon" : "X"}'
    
### テスト実行方法
ターミナルにて以下を入力

```
$ npm run test //テスト実行する。
```
また、カバレッジを合わせて出力の際、以下をターミナルにて実行
```
$ npm run test -- --coverage
```
