FROM node:8-alpine

WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]