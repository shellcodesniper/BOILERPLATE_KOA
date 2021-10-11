FROM node:14-alpine

EXPOSE 3000

RUN apk update
RUN apk add make g++ yarn curl

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV SERVICE_LEVEL=none

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock tsconfig-paths-bootstrap.js tsconfig.json /app/
RUN yarn install --pure-lockfile --ignore-optional --production=false
ADD . /app

RUN yarn global add pm2
ENV PM2_PUBLIC_KEY wcqykpsdrw4673y
ENV PM2_SECRET_KEY 20fuit9xqxmnuee
# NOTE : ADDITIONAL ENV VARIABLES
# ENV GOOGLE_APPLICATION_CREDENTIALS /app/dist/config/firebase_admin.json

RUN yarn build

CMD ["yarn", "docker:start"]