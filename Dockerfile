FROM node:10
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
# Bundle app source
COPY . .
EXPOSE 8080

CMD export NODE_ENV=production

# Define command to run app
CMD [ "node", "server.js" ]

