FROM node:10.15.3-stretch-slim

LABEL maintainer="Juan Pablo Poma Chuquimia"

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        g++ \
        libnspr4-dev \
        libnss3-dev \
        libpoppler-private-dev \
        make \
        pkg-config \
        python \
    && npm install \
    && apt-get purge -y --autoremove \
        g++ \
        make \
        pkg-config \
        python \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R node:node /home/node/app

# COPY --chown=node:node . .

USER node

EXPOSE 4000

CMD ["node","index.js"]
