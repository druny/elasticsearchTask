FROM node:8

WORKDIR /usr/app

COPY package*.json .

RUN yarn install

COPY . .

CMD ["node", "dist/index.js"]
