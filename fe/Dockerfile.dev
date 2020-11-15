FROM node:lts-slim as build

# WORKDIR /usr/src/app
WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci

COPY . /home/node/app
RUN npm run build

FROM nginx:1.17.9-alpine

COPY --from=build /home/node/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]