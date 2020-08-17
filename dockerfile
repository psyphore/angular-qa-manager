FROM node:14.5.0-alpine3.12 AS builder

RUN apk add git openssh-client
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
COPY . .

RUN npm run build:prod

FROM nginx:1.19.1-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx-conf/ /etc/nginx/conf.d

EXPOSE 80
