FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . . 

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 5432
EXPOSE 10000

CMD npm start


