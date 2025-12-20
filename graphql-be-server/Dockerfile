FROM node:24-alpine

WORKDIR /usr/app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
