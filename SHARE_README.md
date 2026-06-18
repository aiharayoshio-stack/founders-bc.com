# Baseball Team LP 共有用メモ

これは黒 x ゴールド基調の野球チームLPです。

## 開き方

1. ZIPを展開する
2. ターミナルで展開したフォルダへ移動する
3. 依存関係を入れる

```bash
pnpm install
```

4. ローカルで起動する

```bash
pnpm run dev
```

5. ブラウザで表示されたURLを開く

通常は以下です。

```text
http://127.0.0.1:3000/
```

## よく編集する場所

- `app/PlayersSection.tsx`: 選手一覧、選手ポップアップ、投球データ
- `app/NewsSection.tsx`: チームニュース
- `app/RecruitSection.tsx`: JOIN US NOW と問い合わせフォーム
- `app/XTimeline.tsx`: Xアカウント表示
- `app/globals.css`: 全体のデザイン、黒 x ゴールドの見た目
- `public/`: ロゴ、写真、球種マップ画像などの置き場

## 補足

- `node_modules` はZIPに含めていません。
- Xの埋め込み表示は、閲覧環境やX側の仕様によって表示が変わることがあります。
- 球種マップ部分は、あとで画像をアップロードして差し替える前提の枠にしています。
