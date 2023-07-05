# Strapi v3 Skeleton

[Strapi](https://strapi.io/) - Open Source Node.js Headless CMS

## Stack

- Strapi 3+
- Node.js 14+
- Postgres 10+

## Development

- `make install` - install all dependencies
- `make dev` - start strapi dev-server
- `make build` - build strapi cms

**ENV**

```env
HOST=0.0.0.0
PORT=1337

DATABASE_TYPE=postgres
DATABASE_URL=postgres://postgres:strapi@0.0.0.0:5432/strapi

IMAGEKIT_FOLDER=/strapi
IMAGEKIT_PUBLIC_KEY=strapi
IMAGEKIT_PRIVATE_KEY=strapi
IMAGEKIT_URL=https://ik.imagekit.io/strapi

AWS_BUCKET=strapi
AWS_ENDPOINT=https://s3.pl-waw.scw.cloud
AWS_ACCESS_KEY_ID=strapi
AWS_ACCESS_SECRET=strapi

ADMIN_JWT_SECRET=strapi

VERCEL_TOKEN=strapi
VERCEL_TEAM_ID=strapi
VERCEL_PROJECT_ID=strapi
VERCEL_TRIGGER_PRODUCTION=strapi
```
