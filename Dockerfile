FROM node:13

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn client-install
RUN yarn build-client

EXPOSE 8080
CMD [ "node", "index.js" ]