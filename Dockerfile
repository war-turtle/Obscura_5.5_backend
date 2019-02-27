FROM node:8-alpine

WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++

COPY package.json .
RUN npm install

COPY . .

RUN openssl aes-256-cbc -K $encrypted_0d2f5ae301a9_key -iv $encrypted_0d2f5ae301a9_iv -in config.js.enc -out config.js -d

EXPOSE 8000

CMD ["npm", "run", "dev"]