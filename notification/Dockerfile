FROM node:18

WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm install

# COPY . .

# Port
EXPOSE 6002

CMD ["npm", "run", "start:dev"]