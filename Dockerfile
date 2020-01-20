# 1. Build phase
FROM node:10 as builder
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
# Bundle app source
COPY . .
EXPOSE 8080

# Define command to run app
CMD [ "node", "server.js" ]
# RUN npm run build

# will be in /app/build folder
# 2. Run phase
# FROM nginx
# COPY --from=builder /app/build /usr/share/nginx/html