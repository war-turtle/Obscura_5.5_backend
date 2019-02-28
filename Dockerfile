FROM node:8-alpine

WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++

RUN apk add gnupg

COPY package.json .
RUN npm install

COPY . .

ARG pass_phrase

RUN gpg --batch --yes --passphrase ${pass_phrase} -o config.js -d config.js.gpg 

EXPOSE 8000

CMD ["npm", "run", "prod"]