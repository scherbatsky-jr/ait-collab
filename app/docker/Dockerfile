FROM node:16 as builder

WORKDIR /usr/src/ait-collab

COPY app app

WORKDIR /usr/src/ait-collab/app

RUN yarn install
RUN yarn run build

FROM nginx:1.21-alpine

COPY ./api/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/ait-collab/app/dist /usr/share/nginx/html
