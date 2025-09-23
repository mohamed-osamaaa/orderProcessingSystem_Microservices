FROM node:18

WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm ci

# COPY . .

# Port
EXPOSE 4002

CMD ["npm", "run", "start:dev"]