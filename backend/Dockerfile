FROM node:20-alpine
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm ci --production && npm cache verify
 
COPY . .
 
CMD [ "node", "index.js" ]