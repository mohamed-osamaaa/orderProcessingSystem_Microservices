FROM node:18

WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm ci

# COPY . .

# Port
EXPOSE 7004

CMD ["npm", "run", "start:dev"]