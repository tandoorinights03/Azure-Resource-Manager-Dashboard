# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
