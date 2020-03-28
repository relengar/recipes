FROM node:lts-slim

# WORKDIR /usr/src/app
WORKDIR /home/node/app

COPY package.json . 
COPY package-lock.json . 
RUN npm ci

COPY . .

RUN npm run build

EXPOSE "$PORT"
CMD ["node", "dist/main.js"]