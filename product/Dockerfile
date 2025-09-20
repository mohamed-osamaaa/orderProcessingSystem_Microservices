FROM node:18

WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm ci

COPY . .

# Port
EXPOSE 4001

CMD ["npm", "run", "start:dev"]