FROM node:14.15.1-alpine

RUN apk update

WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn

COPY .env /usr/app/.env

COPY . /usr/app

CMD ["yarn", "dev:server"]

EXPOSE 3333
