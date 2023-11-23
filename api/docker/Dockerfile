FROM node:16 as builder

WORKDIR /usr/src/ait-collab

ARG api_name='AIT Collab API'
ARG api_port=80
ARG api_version-0.1
ARG mongo='mongodb+srv://scherbatsky:vTED5BwGj4h7z9B@ait-collab.exfqtyc.mongodb.net/?retryWrites=true&w=majority'

COPY api api

ENV APP_NAME $api_name
ENV APP_PORT $api_port
ENV APP_VERSION $api_version
ENV MONGODB_URI $mongo

WORKDIR /usr/src/ait-collab/api

RUN yarn

COPY api /usr/src/ait-collab/api/dist

FROM nginx:1.21-alpine

COPY ./api/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/ait-collab/api/dist /usr/share/nginx/html
