FROM node:alpine as build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /var/www

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
