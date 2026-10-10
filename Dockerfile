FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx astro build

FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
