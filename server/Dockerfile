FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY server/package.json ./server/package.json
COPY client/package.json ./client/package.json
RUN npm ci

COPY server ./server
RUN npm run prisma:generate -w server && npm run build -w server

EXPOSE 3001
CMD ["sh", "-c", "npx prisma db push --schema server/prisma/schema.prisma && npm run prisma:seed -w server && node server/dist/src/index.js"]
