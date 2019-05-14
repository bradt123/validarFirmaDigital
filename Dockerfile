FROM timbru31/java-node:adoptopenjdk-alpine-slim

LABEL maintainer="Juan Pablo Poma Chuquimia"

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install 
COPY . .

EXPOSE 4000

CMD ["node","index.js"]
