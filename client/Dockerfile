FROM node:18.12-alpine3.16 as builder


WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm build

FROM nginx:1.23.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
