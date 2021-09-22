# Stage 1
FROM node:14.17.5-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.21.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/frontend-fruits .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
