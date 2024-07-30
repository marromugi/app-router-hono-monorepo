```
npm install
npm run dev
```

```
npm run deploy
```

npx wrangler d1 migrations apply {db-name} --local
npx prisma migrate diff --from-url file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/xxxx.sqlite --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_fix_user_table.sql
