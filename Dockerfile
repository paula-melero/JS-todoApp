FROM node:10
# Create app directory
WORKDIR /usr/src/JS-todoApp
COPY package*.json ./

RUN npm ci
# Bundle app source
COPY . .
EXPOSE 8080

# Define command to run app
CMD [ "node", "server.js" ]

