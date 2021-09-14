FROM node:14.17.5-slim
# Reference: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# Use DOCKER_BUILDKIT=1 for fastest builds
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]