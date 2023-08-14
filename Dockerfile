FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npx prisma generate
RUN npx prisma migrate dev

RUN npm run build

EXPOSE 5432

CMD npm start

